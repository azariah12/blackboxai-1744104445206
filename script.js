// Initialize map
let map;
let userMarker;
let cellTowerMarkers = [];
let ipMarkers = [];

// Sample Ghana cell tower data (mock)
const ghanaCellTowers = [
    { lat: 5.6037, lng: -0.1870, operator: "MTN Ghana", towerId: "MTN-ACC-001" },
    { lat: 5.5560, lng: -0.1969, operator: "Vodafone Ghana", towerId: "VOD-ACC-042" },
    { lat: 5.6500, lng: -0.1500, operator: "AirtelTigo", towerId: "ATI-ACC-078" },
    // Add more towers as needed
];

// Sample call log data (mock)
const callLogData = [
    { number: "+233244123456", duration: "2:45", time: "10:30 AM", location: "Accra" },
    { number: "+233272987654", duration: "1:15", time: "9:15 AM", location: "Kumasi" },
    { number: "+233543112233", duration: "0:45", time: "Yesterday", location: "Tamale" },
];

// Initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 7.9465, lng: -1.0232 }, // Center of Ghana
        zoom: 7,
        mapTypeId: "hybrid",
    });

    // Add cell tower markers
    addCellTowers();
    
    // Track user's location
    trackUserLocation();
    
    // Initialize IP tracker
    setupIpTracker();
    
    // Populate call log
    populateCallLog();
}

// Add cell tower markers to map
function addCellTowers() {
    cellTowerMarkers = ghanaCellTowers.map(tower => {
        const color = tower.operator.includes("MTN") ? "red" : 
                     tower.operator.includes("Vodafone") ? "blue" : "green";
        
        return new google.maps.Marker({
            position: { lat: tower.lat, lng: tower.lng },
            map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: color,
                fillOpacity: 0.8,
                strokeWeight: 0,
                scale: 6
            },
            title: `${tower.operator} (${tower.towerId})`
        });
    });
}

// Track and display user's current location
function trackUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            position => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // Update or create user marker
                if (userMarker) {
                    userMarker.setPosition(pos);
                } else {
                    userMarker = new google.maps.Marker({
                        position: pos,
                        map,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: "#4285F4",
                            fillOpacity: 1,
                            strokeWeight: 0,
                            scale: 8
                        },
                        title: "Your Location"
                    });
                }
                
                // Update status display
                document.getElementById("current-location").innerHTML = `
                    <i class="fas fa-map-pin text-blue-500 mr-1"></i>
                    <span>${pos.lat.toFixed(4)}° N, ${pos.lng.toFixed(4)}° W</span>
                `;
                
                // Center map on user
                map.setCenter(pos);
            },
            error => {
                console.error("Geolocation error:", error);
                document.getElementById("current-location").innerHTML = `
                    <i class="fas fa-map-pin text-red-500 mr-1"></i>
                    <span>Location access denied</span>
                `;
            },
            { enableHighAccuracy: true, maximumAge: 10000 }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Setup IP address tracker functionality
function setupIpTracker() {
    document.getElementById("track-ip").addEventListener("click", () => {
        const ipInput = document.getElementById("ip-input").value.trim();
        
        if (!ipInput) {
            alert("Please enter an IP address");
            return;
        }
        
        // Mock IP lookup (in real app, would use ip-api.com or similar)
        const mockResponse = {
            status: "success",
            country: "Ghana",
            city: ipInput === "192.168.1.1" ? "Accra" : "Kumasi",
            isp: "MTN Ghana",
            lat: 5.6037 + (Math.random() * 0.1 - 0.05),
            lon: -0.1870 + (Math.random() * 0.1 - 0.05)
        };
        
        displayIpResults(mockResponse);
        addIpMarker(mockResponse);
    });
}

// Display IP lookup results
function displayIpResults(data) {
    document.getElementById("ip-country").textContent = data.country;
    document.getElementById("ip-city").textContent = data.city;
    document.getElementById("ip-isp").textContent = data.isp;
    document.getElementById("ip-coords").textContent = 
        `${data.lat.toFixed(4)}° N, ${data.lon.toFixed(4)}° W`;
    
    document.getElementById("ip-results").classList.remove("hidden");
}

// Add marker for IP location
function addIpMarker(data) {
    // Clear previous IP markers
    ipMarkers.forEach(marker => marker.setMap(null));
    ipMarkers = [];
    
    const ipMarker = new google.maps.Marker({
        position: { lat: data.lat, lng: data.lon },
        map,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            fillColor: "#FBBC05",
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8,
            rotation: 180
        },
        title: `IP Location: ${data.city}, ${data.country}`
    });
    
    ipMarkers.push(ipMarker);
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="text-sm">
                <div class="font-semibold">IP Location</div>
                <div>${data.city}, ${data.country}</div>
                <div>ISP: ${data.isp}</div>
                <div>Coordinates: ${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}</div>
            </div>
        `
    });
    
    ipMarker.addListener("click", () => {
        infoWindow.open(map, ipMarker);
    });
}

// Populate the call log with sample data
function populateCallLog() {
    const callLog = document.getElementById("call-log");
    callLog.innerHTML = "";
    
    callLogData.forEach(call => {
        const callEntry = document.createElement("div");
        callEntry.className = "call-entry p-2 rounded cursor-pointer";
        callEntry.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <div class="font-medium">${call.number}</div>
                    <div class="text-xs text-gray-500">${call.location}</div>
                </div>
                <div class="text-right">
                    <div class="text-sm">${call.time}</div>
                    <div class="text-xs text-gray-500">${call.duration}</div>
                </div>
            </div>
        `;
        
        callLog.appendChild(callEntry);
    });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Settings button functionality
    document.querySelector("button:has(.fa-cog)").addEventListener("click", () => {
        alert("Settings page would open here");
    });
    
    // Help button functionality
    document.querySelector("button:has(.fa-question-circle)").addEventListener("click", () => {
        alert("Help page would open here");
    });
});