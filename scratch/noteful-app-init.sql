SELECT CURRENT_DATE;

-- Start from scratch, delete old notes table
DROP TABLE IF EXISTS notes;

-- Create table
CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT current_timestamp
);

-- Init ID values at 1000
ALTER SEQUENCE notes_id_seq RESTART 1000;

-- Add some test data
INSERT INTO notes (title, content)
   VALUES  ('LOCAL MAN PRAISES SUN', 'Earlier today, a man lifted his arms gracefully into the air and beheld the sun. Glorious!'),
			('10 Miracles to Attune to on a Sunny Day', 'Sunlight spear, greater sunlight spear, heal, greater heal, I lied there are only four'),
			('Invaders to Hunt', 'Marvelous Chester; Patches the Hyena; Kirk, Knight of Thorns; Knight Lautrec; Paladin Leeroy'),
			('Why Miracles are Better than Sorcery', 'Miracle users are known to be generally better people'),
			('Top Jolly Cooperation Spots', 'I suggest before Ornstein and Smough. Hard fight for newbies. Also, yknow, wherever.'),
			('Solaire Greeting', 'Ah, hello! You don''t look Hollow, far from it! I am Solaire of Astora, an adherent of the Lord of Sunlight. Now that I am Undead, I have come to this great land, the birthplace of Lord Gwyn, to seek my very own sun! ...Do you find that strange? Well, you should! No need to hide your reaction. I get that look all the time! Hah hah hah!'),
			('Solaire Retaliate', 'If a stubborn beast you be, I have no choice! A Warrior of the Sun will not just sit and take it!'),
			('Solaire Sad', 'Why...? Why? After all this searching, I still cannot find it...'),
			('Solaire Revelation', 'Finally, I have found it, I have...! My very own sun... I am the sun...!'),
			('Incoherent Screaming', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAA AAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
			
