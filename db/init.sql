CREATE TABLE IF NOT EXISTS brainrots (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  base_hp INTEGER NOT NULL,
  base_attack INTEGER NOT NULL,
  is_boss BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add is_boss column if it doesn't exist (migration for existing tables)
ALTER TABLE brainrots ADD COLUMN IF NOT EXISTS is_boss BOOLEAN NOT NULL DEFAULT FALSE;
-- Add image column if it doesn't exist
ALTER TABLE brainrots ADD COLUMN IF NOT EXISTS image TEXT;

CREATE INDEX IF NOT EXISTS idx_brainrots_name ON brainrots(name);
CREATE INDEX IF NOT EXISTS idx_brainrots_created_at ON brainrots(created_at);

--- Insert default brainrots
INSERT INTO brainrots (id, name, base_hp, base_attack, is_boss, created_at, image) VALUES 
(1, 'Tralalero Tralala', 870, 87, FALSE, NOW(), 'Tralalelo_tralala'),
(2, 'Tung Tung Tung Sahur', 870, 87, FALSE, NOW(), 'Tung_tung_tung_sahur'),
(3, 'Ballerina Cappuccina', 400, 40, FALSE, NOW(), 'Ballerina_cappucappu'),
(4, 'Brr Brr Patapim', 302, 30, FALSE, NOW(), 'Brr_brr_patapim_without_text'),
(5, 'Bombardilo Crocodilo', 259, 26, FALSE, NOW(), 'Bombardiro_Crocodillo'),
(6, 'Cappuccino Assassino', 319, 32, FALSE, NOW(), 'Cappucino_assasino'),
(7, 'Lirili Larila', 262, 26, FALSE, NOW(), 'Lirili_Larila'),
(8, 'Garama and Madungdung', 189, 19, FALSE, NOW(), 'Garamararamararaman_dan_Madudungdung_tak_tuntung_perkuntung'),
(9, 'Los Tralaleritos', 186, 19, FALSE, NOW(), 'LosTraDicTra'),
(10, 'Chicleteira Bicicleteira', 179, 18, FALSE, NOW(), 'Chicleteira_Bicicleteira'),
(11, 'Trippi Troppi', 172, 17, FALSE, NOW(), 'Trippi_TroppiFISH'),
(12, 'Chimpanzini Bananini', 160, 16, FALSE, NOW(), 'Chimpanzini_Bananino'),
(13, 'Esok Sekolah', 148, 15, FALSE, NOW(), 'BetterEsokSekolah'),
(14, 'Boneca Ambalabu', 123, 12, FALSE, NOW(), 'Boneka-Ambalabu'),
(15, 'Pot Hotspot', 121, 12, FALSE, NOW(), 'Pot_Hotspot'),
(16, 'Trulimero Trulicina', 114, 11, FALSE, NOW(), 'Trulimerotrulichina'),
(17, 'Bombombini Gusini', 111, 11, FALSE, NOW(), 'Bombombini_gusini_original'),
(18, 'Job Job Job Sahur', 104, 10, FALSE, NOW(), 'Job_sahur'),
(19, 'U Din Din Din Din Dun Ma Din Din Din Dun', 90, 9, FALSE, NOW(), 'U_Din_Din_Din_Din_Dun_Ma_Din_Din_Din_Dun2'),
(20, 'Orcalero Orcala', 83, 8, FALSE, NOW(), 'OrcaleroORCALA!'),
(21, 'Noobini Pizzanini', 70, 7, FALSE, NOW(), 'Noobini_Pizzanini'),
(22, 'La Vacca Saturno Saturnita', 69, 7, FALSE, NOW(), 'Saturno_Saturnita'),
(23, 'Frigo Camelo', 64, 6, FALSE, NOW(), 'Frigo_Camelo'),
(24, 'Pakrahmatmamat', 55, 6, FALSE, NOW(), 'Pakmat'),
(25, 'Cocofanto Elefanto', 53, 5, FALSE, NOW(), 'Cocofanto_Elefanto'),
(26, 'Las Tralaleritas', 47, 5, FALSE, NOW(), 'Tralalertia'),
(27, 'La Grande Combinasion', 1500, 150, TRUE, NOW(), 'LA_Grande_Combinacion'),
(28, 'Bisonte Giuppitere', 427, 43, FALSE, NOW(), 'Il_Bisonte_Giuppiture_Giuppitercito'),
(29, 'Ta Ta Ta Sahur', 418, 42, FALSE, NOW(), 'Ta_ta_ta_ta_ta_ta_ta_ta_sahur'),
(30, 'Bobrito Bandito', 407, 41, FALSE, NOW(), 'Bober_Bandito'),
(31, 'Ballerino Lololo', 383, 38, FALSE, NOW(), 'Ballerino_lololo'),
(32, 'Burbaloni Luliloli', 333, 33, FALSE, NOW(), 'Burbaloni_Luliloli'),
(33, 'Piccione Macchina', 329, 33, FALSE, NOW(), 'Piccione_Macchina'),
(34, 'Špijuniro Golubiro', 327, 33, FALSE, NOW(), 'SPINOIRO_GOLUBIRO'),
(35, 'Glorbo Fruttodrillo', 314, 31, FALSE, NOW(), 'Glorbo_Fruttodrillo'),
(36, 'Bulbito Bandito', 296, 30, FALSE, NOW(), 'Bulbito_Bandito_Traktorito'),
(37, 'Frulli Frulla', 295, 30, FALSE, NOW(), 'FrulliFrulla'),
(38, 'Te Te Te Sahur', 292, 29, FALSE, NOW(), 'TeTeTeTeTeSahur'),
(39, 'Ti Ti Ti Sahur', 274, 27, FALSE, NOW(), 'Ti_ti_ti_ti_sahur_rei'),
(40, 'Los Matteos', 259, 26, FALSE, NOW(), 'LOS_MATTEOCITOS'),
(41, 'Pipi Kiwi', 228, 23, FALSE, NOW(), 'Pipikiwi'),
(42, 'Tigroligre Frutonni', 218, 22, FALSE, NOW(), 'Tigrulli_Grapefrutunni'),
(43, 'Mastodontico Telepiedone', 202, 20, FALSE, NOW(), 'Il_Mastodontico_Telepiedone_Planetario'),
(44, 'Canneloni Dragoni', 188, 19, FALSE, NOW(), 'Cannelloni_Dragoni'),
(45, 'Blueberrinni Octopussini', 155, 16, FALSE, NOW(), 'Blueberrinni_Octopussini'),
(46, 'Brr Es Teh Patipum', 147, 15, FALSE, NOW(), 'Brr_es_patipum'),
(47, 'Rhino Toasterino', 147, 15, FALSE, NOW(), 'Rhino_Toasterino'),
(48, 'Trenostruzzo Turbo 3000', 143, 14, FALSE, NOW(), 'Trenostruzzo_Turbo_3000'),
(49, 'Orangutini Ananasini', 126, 13, FALSE, NOW(), 'Orangutini_Ananasini_V2'),
(50, 'Bri Bri Bicus Dicus', 126, 13, FALSE, NOW(), 'Brri_Brri_Bicus_Dicus_Bombicus'),
(51, 'Gangster Footera', 124, 12, FALSE, NOW(), 'Gangster_Footera'),
(52, 'Los Orcaleritos', 121, 12, FALSE, NOW(), 'Orcaleritosss'),
(53, 'Giraffa Celeste', 116, 12, FALSE, NOW(), 'Giraffa_Celeste'),
(54, 'Tracotucotulu Delapeladustuz', 112, 11, FALSE, NOW(), 'Tracotucotulu_Delapeladustuz'),
(67, 'Six-Seven', 67, 67, FALSE, NOW(), 'Six-seven')
ON CONFLICT (id) DO NOTHING;

-- Reset the sequence to start after the highest ID
SELECT setval('brainrots_id_seq', (SELECT MAX(id) FROM brainrots));