const { GoogleGenerativeAI } = require("@google/generative-ai");

// @desc    Generate travel itinerary using Gemini AI
// @route   POST /api/gemini/generate-itinerary
// @access  Private
const generateItinerary = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: 'Gemini API key is not configured' });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const { destination, dates, preferences } = req.body;
    
    if (!destination || !dates || !preferences) {
      return res.status(400).json({ message: 'Missing required trip preferences' });
    }
    
    const { startDate, endDate } = dates;
    const { budget, travelStyle, interests, duration } = preferences;
    
    // Ensure interests is always an array before joining
    const interestsString = interests && interests.length > 0 ? interests.join(', ') : 'no specific interests';
    
    // Construct prompt for the Gemini model
    const prompt = `
    Generate a detailed travel itinerary for exactly ${duration} days with the following preferences:

    Destination: ${destination.city}, ${destination.country}
    Start Date: ${startDate}
    End Date: ${endDate}

    Budget: ${budget} (e.g., Luxury, Mid-range, Budget)
    Travel Style: ${travelStyle} (e.g., Adventurous, Relaxing, Cultural, Family-friendly)
    Interests: ${interestsString}

    Please provide a day-by-day breakdown. For each day, include:
    - Day number (e.g., Day 1)
    - Date (e.g., YYYY-MM-DD)
    - A general theme or focus for the day.
    - 3-5 specific activities/places to visit.
    - A suggestion for breakfast, lunch, and dinner (e.g., "Breakfast at local cafe", "Lunch at [Cuisine] restaurant", "Dinner at [Type] eatery").
    - A brief description of why each activity/place is recommended.

    Format the output as a JSON object with the following structure. **Ensure the 'days' array contains exactly ${duration} objects, one for each day of the trip, with sequential dates.**
    {
      "title": "Trip to ${destination.city} Itinerary",
      "days": [
        {
          "day": "Day 1",
          "date": "YYYY-MM-DD",
          "theme": "Exploring the Historic Core",
          "activities": [
            {
              "name": "Visit [Landmark]",
              "description": "Brief description."
            },
            // ... 3-5 more activities for Day 1
          ],
          "meals": {
            "breakfast": "Suggestion",
            "lunch": "Suggestion",
            "dinner": "Suggestion"
          }
        },
        // ... Day 2 object, Day 3 object, up to Day ${duration} object ...
      ]
    }

    Ensure all text is enclosed in double quotes. Do not include any extra text or markdown outside the JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up response and parse JSON
    let jsonString = text.replace(/```json\n|\n```/g, '');
    let itinerary = JSON.parse(jsonString);
    
    // Validate the structure of the generated itinerary
    if (!itinerary || !Array.isArray(itinerary.days)) {
      return res.status(500).json({ message: "Invalid itinerary structure received from AI" });
    }
    
    // Post-process itinerary to ensure correct number of days
    const generatedDays = itinerary.days;
    const expectedDuration = parseInt(duration, 10);
    
    if (generatedDays.length > expectedDuration) {
      // Truncate if too many days
      itinerary.days = generatedDays.slice(0, expectedDuration);
    } else if (generatedDays.length < expectedDuration) {
      // Pad if too few days
      const lastGeneratedDate = generatedDays.length > 0 
        ? new Date(generatedDays[generatedDays.length - 1].date) 
        : new Date(startDate);
      
      for (let i = generatedDays.length; i < expectedDuration; i++) {
        const nextDate = new Date(lastGeneratedDate);
        nextDate.setDate(lastGeneratedDate.getDate() + (i === generatedDays.length ? 1 : 0));
        if (i > generatedDays.length) {
          nextDate.setDate(nextDate.getDate() + 1);
        }
        
        itinerary.days.push({
          day: `Day ${i + 1}`,
          date: nextDate.toISOString().split('T')[0],
          theme: "Further exploration or travel day",
          activities: [
            { name: "Explore at leisure", description: "Enjoy free time or re-visit favorite spots.", id: Math.random().toString(36).substring(2, 9) }
          ],
          meals: {
            breakfast: "",
            lunch: "",
            dinner: ""
          }
        });
        lastGeneratedDate.setDate(nextDate.getDate());
      }
    }
    
    // Add unique IDs to activities
    itinerary.days.forEach(day => {
      day.activities = Array.isArray(day.activities) ? day.activities : [];
      day.activities.forEach(activity => {
        if (!activity.id) {
          activity.id = Math.random().toString(36).substring(2, 9);
        }
      });
    });
    
    res.json(itinerary);
  } catch (error) {
    console.error('Generate itinerary error:', error);
    res.status(500).json({ message: 'Error generating itinerary', error: error.message });
  }
};

module.exports = {
  generateItinerary,
};
