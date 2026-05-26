const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET);

app.get('/', (req, res) => {
    res.send("🚀 VibeMeet Backend Server is Live from GitHub!");
});

app.get('/api/check-update', async (req, res) => {
    try {
        const { data, error } = await supabase.from('app_version').select('*').single();
        if (error) throw error;
        res.json({ success: true, message: "✅ Database Connected!", data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
