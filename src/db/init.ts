import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  connectionString: 'postgresql://nitplovedb_owner:npg_eJ30YDPVICdW@ep-royal-bird-a9c57edf-pooler.gwc.azure.neon.tech/nitplovedb?sslmode=require',
});

async function initializeDatabase() {
  const client = await pool.connect();

  try {
    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSQL);

    // Insert sample user
    const userResult = await client.query(
      `INSERT INTO users (full_name, email, phone, address, membership_number, membership_type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        'John Doe',
        'john.doe@example.com',
        '+234 801 234 5678',
        '123 Planning Street, Abuja, Nigeria',
        'TPA3628472915',
        'Full Member',
      ]
    );

    const userId = userResult.rows[0].id;

    // Insert professional info
    await client.query(
      `INSERT INTO professional_info (user_id, specialization, years_of_experience, current_position, organization)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        userId,
        'Urban Planning',
        15,
        'Senior Urban Planner',
        'Federal Ministry of Urban Development',
      ]
    );

    // Insert qualifications
    const qualifications = [
      'Bachelor of Urban and Regional Planning',
      'Master of Urban Planning',
      'PhD in Urban Development',
    ];

    for (const qualification of qualifications) {
      await client.query(
        'INSERT INTO qualifications (user_id, qualification) VALUES ($1, $2)',
        [userId, qualification]
      );
    }

    // Insert certifications
    const certifications = [
      'Certified Urban Planner (CUP)',
      'Professional Urban Designer (PUD)',
    ];

    for (const certification of certifications) {
      await client.query(
        'INSERT INTO certifications (user_id, certification) VALUES ($1, $2)',
        [userId, certification]
      );
    }

    // Insert user preferences
    await client.query(
      `INSERT INTO user_preferences (
        user_id, email_notifications, sms_notifications, push_notifications,
        profile_visibility, show_contact_info, show_qualifications
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        userId,
        true,
        true,
        true,
        'public',
        true,
        true,
      ]
    );

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run the initialization
initializeDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }); 