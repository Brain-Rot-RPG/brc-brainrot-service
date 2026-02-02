CREATE TABLE IF NOT EXISTS brainrots (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  base_hp INTEGER NOT NULL,
  base_attack INTEGER NOT NULL,
  is_boss BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add is_boss column if it doesn't exist (migration for existing tables)
ALTER TABLE brainrots ADD COLUMN IF NOT EXISTS is_boss BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_brainrots_name ON brainrots(name);
CREATE INDEX IF NOT EXISTS idx_brainrots_created_at ON brainrots(created_at);

--- Insert default brainrots
INSERT INTO brainrots (id, name, base_hp, base_attack, is_boss, created_at) VALUES 
('1', 'Tralalero Tralala', 870, 87, FALSE, NOW()),
('2', 'Tung Tung Tung Sahur', 870, 87, FALSE, NOW()),
('3', 'Ballerina Cappuccina', 400, 40, FALSE, NOW()),
('4', 'Brr Brr Patapim', 302, 30, FALSE, NOW()),
('5', 'Bombardilo Crocodilo', 259, 26, FALSE, NOW()),
('6', 'Cappuccino Assassino', 319, 32, FALSE, NOW()),
('7', 'Lirili Larila', 262, 26, FALSE, NOW()),
('8', 'Garama and Madungdung', 189, 19, FALSE, NOW()),
('9', 'Los Tralaleritos', 186, 19, FALSE, NOW()),
('10', 'Chicleteira Bicicleteira', 179, 18, FALSE, NOW()),
('11', 'Trippi Troppi', 172, 17, FALSE, NOW()),
('12', 'Chimpanzini Bananini', 160, 16, FALSE, NOW()),
('13', 'Esok Sekolah', 148, 15, FALSE, NOW()),
('14', 'Boneca Ambalabu', 123, 12, FALSE, NOW()),
('15', 'Pot Hotspot', 121, 12, FALSE, NOW()),
('16', 'Trulimero Trulicina', 114, 11, FALSE, NOW()),
('17', 'Bombombini Gusini', 111, 11, FALSE, NOW()),
('18', 'Job Job Job Sahur', 104, 10, FALSE, NOW()),
('19', 'U Din Din Din Din Dun Ma Din Din Din Dun', 90, 9, FALSE, NOW()),
('20', 'Orcalero Orcala', 83, 8, FALSE, NOW()),
('21', 'Noobini Pizzanini', 70, 7, FALSE, NOW()),
('22', 'La Vacca Saturno Saturnita', 69, 7, FALSE, NOW()),
('23', 'Frigo Camelo', 64, 6, FALSE, NOW()),
('24', 'Pakrahmatmamat', 55, 6, FALSE, NOW()),
('25', 'Cocofanto Elefanto', 53, 5, FALSE, NOW()),
('26', 'Las Tralaleritas', 47, 5, FALSE, NOW()),
('27', 'La Grande Combinasion', 1500, 150, TRUE, NOW()),
('28', 'Bisonte Giuppitere', 427, 43, FALSE, NOW()),
('29', 'Ta Ta Ta Sahur', 418, 42, FALSE, NOW()),
('30', 'Bobrito Bandito', 407, 41, FALSE, NOW()),
('31', 'Ballerino Lololo', 383, 38, FALSE, NOW()),
('32', 'Burbaloni Luliloli', 333, 33, FALSE, NOW()),
('33', 'Piccione Macchina', 329, 33, FALSE, NOW()),
('34', 'Špijuniro Golubiro', 327, 33, FALSE, NOW()),
('35', 'Glorbo Fruttodrillo', 314, 31, FALSE, NOW()),
('36', 'Bulbito Bandito', 296, 30, FALSE, NOW()),
('37', 'Frulli Frulla', 295, 30, FALSE, NOW()),
('38', 'Te Te Te Sahur', 292, 29, FALSE, NOW()),
('39', 'Ti Ti Ti Sahur', 274, 27, FALSE, NOW()),
('40', 'Los Matteos', 259, 26, FALSE, NOW()),
('41', 'Pipi Kiwi', 228, 23, FALSE, NOW()),
('42', 'Tigroligre Frutonni', 218, 22, FALSE, NOW()),
('43', 'Mastodontico Telepiedone', 202, 20, FALSE, NOW()),
('44', 'Canneloni Dragoni', 188, 19, FALSE, NOW()),
('45', 'Blueberrinni Octopussini', 155, 16, FALSE, NOW()),
('46', 'Brr Es Teh Patipum', 147, 15, FALSE, NOW()),
('47', 'Rhino Toasterino', 147, 15, FALSE, NOW()),
('48', 'Trenostruzzo Turbo 3000', 143, 14, FALSE, NOW()),
('49', 'Orangutini Ananasini', 126, 13, FALSE, NOW()),
('50', 'Bri Bri Bicus Dicus', 126, 13, FALSE, NOW()),
('51', 'Gangster Footera', 124, 12, FALSE, NOW()),
('52', 'Los Orcaleritos', 121, 12, FALSE, NOW()),
('53', 'Giraffa Celeste', 116, 12, FALSE, NOW()),
('67', 'Six-Seven', 67, 67, TRUE, NOW())
ON CONFLICT (id) DO NOTHING;