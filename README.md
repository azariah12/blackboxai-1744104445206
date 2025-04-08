
Built by https://www.blackbox.ai

---

```markdown
# Ghana Location Tracker

## Project Overview
The Ghana Location Tracker is a web application designed to track user location in Ghana and provide information about cell towers as well as IP address location tracking. The application features an interactive map that displays both the user's current location and cell tower locations. Users can also input an IP address to retrieve location-based information and recent call logs.

## Installation
To run the Ghana Location Tracker locally, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ghana-location-tracker.git
   cd ghana-location-tracker
   ```
2. Open `index.html` in your preferred web browser.
3. You need to replace `YOUR_API_KEY` in the Google Maps API script tag within `index.html` with your actual Google Maps API key.

## Usage
- Enter an IP address in the provided input field and click the search button to retrieve location data.
- The map will automatically update to show your current location as well as cell tower markers.
- Access recent call logs displayed below the IP tracker section.

## Features
- **Interactive Map**: Displays current user location and cell tower locations in Ghana.
- **IP Location Tracker**: Allows users to input IP addresses and receive location details.
- **Recent Call Log**: Shows a list of recent calls with relevant information.
- **Responsive Design**: Utilizes Tailwind CSS for a modern, user-friendly interface.

## Dependencies
This project uses external libraries:
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Font Awesome](https://fontawesome.com/) for icons.
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) for map functionality (requires an API key).

## Project Structure
```
/ghana-location-tracker
│
├── index.html       # Main HTML file for the application
└── script.js        # JavaScript file containing logic for map and IP tracking
```

## Additional Notes
- Ensure you have a stable internet connection for accessing Google Maps and external resources.
- This project is a mock setup and uses sample data for demonstration purposes. You can enhance it by integrating real-time data APIs.

Feel free to contribute or raise issues if you find any bugs!
```