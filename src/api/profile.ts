import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://nitplovedb_owner:npg_eJ30YDPVICdW@ep-royal-bird-a9c57edf-pooler.gwc.azure.neon.tech/nitplovedb?sslmode=require',
});

export async function updateProfile(userId: string, profileData: any) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Update personal information
    await client.query(
      `UPDATE users 
       SET full_name = $1, email = $2, phone = $3, address = $4, profile_image = $5
       WHERE id = $6`,
      [
        profileData.personalInfo.fullName,
        profileData.personalInfo.email,
        profileData.personalInfo.phone,
        profileData.personalInfo.address,
        profileData.personalInfo.profileImage,
        userId,
      ]
    );

    // Update professional information
    await client.query(
      `UPDATE professional_info 
       SET specialization = $1, years_of_experience = $2, current_position = $3, organization = $4
       WHERE user_id = $5`,
      [
        profileData.professionalInfo.specialization,
        profileData.professionalInfo.yearsOfExperience,
        profileData.professionalInfo.currentPosition,
        profileData.professionalInfo.organization,
        userId,
      ]
    );

    // Update qualifications
    await client.query('DELETE FROM qualifications WHERE user_id = $1', [userId]);
    for (const qualification of profileData.professionalInfo.qualifications) {
      await client.query(
        'INSERT INTO qualifications (user_id, qualification) VALUES ($1, $2)',
        [userId, qualification]
      );
    }

    // Update certifications
    await client.query('DELETE FROM certifications WHERE user_id = $1', [userId]);
    for (const certification of profileData.professionalInfo.certifications) {
      await client.query(
        'INSERT INTO certifications (user_id, certification) VALUES ($1, $2)',
        [userId, certification]
      );
    }

    // Update preferences
    await client.query(
      `UPDATE user_preferences 
       SET email_notifications = $1, sms_notifications = $2, push_notifications = $3,
           profile_visibility = $4, show_contact_info = $5, show_qualifications = $6
       WHERE user_id = $7`,
      [
        profileData.preferences.notifications.email,
        profileData.preferences.notifications.sms,
        profileData.preferences.notifications.push,
        profileData.preferences.privacy.profileVisibility,
        profileData.preferences.privacy.showContactInfo,
        profileData.preferences.privacy.showQualifications,
        userId,
      ]
    );

    await client.query('COMMIT');
    return { success: true };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getProfile(userId: string) {
  const client = await pool.connect();
  
  try {
    const userResult = await client.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    const professionalInfoResult = await client.query(
      'SELECT * FROM professional_info WHERE user_id = $1',
      [userId]
    );

    const qualificationsResult = await client.query(
      'SELECT qualification FROM qualifications WHERE user_id = $1',
      [userId]
    );

    const certificationsResult = await client.query(
      'SELECT certification FROM certifications WHERE user_id = $1',
      [userId]
    );

    const preferencesResult = await client.query(
      'SELECT * FROM user_preferences WHERE user_id = $1',
      [userId]
    );

    const user = userResult.rows[0];
    const professionalInfo = professionalInfoResult.rows[0];
    const preferences = preferencesResult.rows[0];

    return {
      personalInfo: {
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profileImage: user.profile_image,
      },
      professionalInfo: {
        membershipNumber: user.membership_number,
        membershipType: user.membership_type,
        specialization: professionalInfo.specialization,
        yearsOfExperience: professionalInfo.years_of_experience,
        currentPosition: professionalInfo.current_position,
        organization: professionalInfo.organization,
        qualifications: qualificationsResult.rows.map(row => row.qualification),
        certifications: certificationsResult.rows.map(row => row.certification),
      },
      preferences: {
        notifications: {
          email: preferences.email_notifications,
          sms: preferences.sms_notifications,
          push: preferences.push_notifications,
        },
        privacy: {
          profileVisibility: preferences.profile_visibility,
          showContactInfo: preferences.show_contact_info,
          showQualifications: preferences.show_qualifications,
        },
      },
    };
  } finally {
    client.release();
  }
} 