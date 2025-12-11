const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Proxy endpoint for UTM timetable
app.get('/api/timetable', async (req, res) => {
  const { id, role } = req.query; // e.g., id=A23CS0086, role=student

  if (!id) {
    return res.status(400).json({ error: "Missing 'id' parameter" });
  }

  try {
    // Call UTM's real service (commented out for demo safety)
     const utmUrl = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?matric=${id}`;
     const response = await axios.get(utmUrl);

    // --- MOCK DATA (replace with real call when deployed in UTM network) ---
    const mockData = {
      user: { id, name: "Ismail Esa", role },
      timetable: [
        { course: "SECV3104", venue: "N28-03", day: "Monday", start: "09:00", end: "11:00" },
        { course: "SECV2463", venue: "N28-05", day: "Wednesday", start: "13:00", end: "15:00" }
      ]
    };
    // ---

    res.json(mockData);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Failed to fetch timetable from UTM" });
  }
});

// Mock auth (no real UTM SSO in prototype)
app.post('/api/login', (req, res) => {
  const { id, password, role } = req.body;

  // Simple validation (in real: verify via UTM LDAP or mock DB)
  if (id && password && ['student', 'lecturer', 'admin'].includes(role)) {
    res.json({
      success: true,
      token: "mock_jwt_token_123",
      user: { id, role, name: "Demo User" }
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy running on http://localhost:${PORT}`);
});