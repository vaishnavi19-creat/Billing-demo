INSERT INTO unit_conversions (from_unit_id, to_unit_id, conversion_factor, description) VALUES

-- Mass Conversions
(1, 3, 0.001, 'Convert Gram to Kilogram'),  -- Gram to Kilogram
(3, 1, 1000, 'Convert Kilogram to Gram'),  -- Kilogram to Gram
(1, 2, 1000, 'Convert Gram to Milligram'),  -- Gram to Milligram
(2, 1, 0.001, 'Convert Milligram to Gram'),  -- Milligram to Gram
(4, 1, 200, 'Convert Carat to Gram'),  -- Carat to Gram
(1, 5, 0.00220462, 'Convert Gram to Pound'),  -- Gram to Pound
(5, 1, 453.592, 'Convert Pound to Gram'),  -- Pound to Gram
(1, 6, 0.01, 'Convert Gram to Quintal'),  -- Gram to Quintal
(6, 1, 100000, 'Convert Quintal to Gram'),  -- Quintal to Gram
(5, 7, 16, 'Convert Pound to Ounce'),  -- Pound to Ounce
(7, 5, 0.0625, 'Convert Ounce to Pound'),  -- Ounce to Pound

-- Volume Conversions
(8, 9, 0.001, 'Convert Milliliter to Liter'),  -- Milliliter to Liter
(9, 8, 1000, 'Convert Liter to Milliliter'),  -- Liter to Milliliter
(10, 9, 1000, 'Convert Cubic Meter to Liter'),  -- Cubic Meter to Liter
(9, 10, 0.001, 'Convert Liter to Cubic Meter'),  -- Liter to Cubic Meter
(9, 11, 0.264172, 'Convert Liter to Gallon'),  -- Liter to Gallon
(11, 9, 3.78541, 'Convert Gallon to Liter'),  -- Gallon to Liter
(8, 12, 0.236588, 'Convert Milliliter to Cup'),  -- Milliliter to Cup
(12, 8, 4.22675, 'Convert Cup to Milliliter');  -- Cup to Milliliter

-- Length Conversions
(13, 14, 0.01, 'Convert Centimeter to Meter'),  -- Centimeter to Meter
(14, 13, 100, 'Convert Meter to Centimeter'),  -- Meter to Centimeter
(15, 14, 0.0254, 'Convert Inch to Meter'),  -- Inch to Meter
(14, 15, 39.3701, 'Convert Meter to Inch'),  -- Meter to Inch
(14, 16, 3.28084, 'Convert Meter to Feet'),  -- Meter to Feet
(16, 14, 0.3048, 'Convert Feet to Meter'),  -- Feet to Meter
(17, 14, 1000, 'Convert Kilometer to Meter'),  -- Kilometer to Meter
(14, 17, 0.001, 'Convert Meter to Kilometer'),  -- Meter to Kilometer
(14, 18, 1.09361, 'Convert Meter to Yard'),  -- Meter to Yard
(18, 14, 0.9144, 'Convert Yard to Meter'),  -- Yard to Meter
(15, 17, 0.000621371, 'Convert Inch to Mile'),  -- Inch to Mile
(17, 15, 63360, 'Convert Mile to Inch');  -- Mile to Inch

-- Area Conversions
(19, 20, 1, 'Convert Square Meter to Square Meter'),  -- Square Meter to Square Meter
(19, 21, 0.000247105, 'Convert Square Meter to Acre'),  -- Square Meter to Acre
(21, 19, 4046.86, 'Convert Acre to Square Meter'),  -- Acre to Square Meter
(19, 22, 0.0001, 'Convert Square Meter to Hectare'),  -- Square Meter to Hectare
(22, 19, 10000, 'Convert Hectare to Square Meter'),  -- Hectare to Square Meter
(19, 23, 0.000000386102, 'Convert Square Meter to Square Kilometer'),  -- Square Meter to Square Kilometer
(23, 19, 2589988.11, 'Convert Square Kilometer to Square Meter'),  -- Square Kilometer to Square Meter
(19, 24, 10.7639, 'Convert Square Meter to Square Feet'),  -- Square Meter to Square Feet
(24, 19, 0.092903, 'Convert Square Feet to Square Meter');  -- Square Feet to Square Meter

-- Quantity Conversions
(25, 26, 1, 'Convert Piece to Piece'),  -- Piece to Piece
(25, 27, 1, 'Convert Tablet to Tablet'),  -- Tablet to Tablet
(25, 28, 1, 'Convert Capsule to Capsule'),  -- Capsule to Capsule
(25, 29, 1, 'Convert Vial to Vial'),  -- Vial to Vial
(25, 30, 1, 'Convert Ampoule to Ampoule'),  -- Ampoule to Ampoule
(25, 31, 1, 'Convert Packet to Packet'),  -- Packet to Packet
(25, 32, 1, 'Convert Dozen to Dozen'),  -- Dozen to Dozen
(25, 33, 1, 'Convert Bunch to Bunch'),  -- Bunch to Bunch
(25, 34, 1, 'Convert Pair to Pair'),  -- Pair to Pair
(25, 35, 1, 'Convert Set to Set'),  -- Set to Set
(25, 36, 1, 'Convert Box to Box'),  -- Box to Box
(25, 37, 1, 'Convert Pack to Pack'),  -- Pack to Pack
(25, 38, 1, 'Convert Slice to Slice'),  -- Slice to Slice
(25, 39, 1, 'Convert Tray to Tray'),  -- Tray to Tray
(25, 40, 1, 'Convert Bale to Bale'),  -- Bale to Bale
(25, 41, 1, 'Convert Bundle to Bundle');  -- Bundle to Bundle

-- Time Conversions
(42, 43, 60, 'Convert Second to Minute'),  -- Second to Minute
(43, 42, 1/60, 'Convert Minute to Second'),  -- Minute to Second
(43, 44, 60, 'Convert Minute to Hour'),  -- Minute to Hour
(44, 43, 1/60, 'Convert Hour to Minute');  -- Hour to Minute

-- Jewelry-specific Conversions
(4, 1, 0.2, 'Convert Carat to Gram'),  -- Carat to Gram
(1, 4, 5, 'Convert Gram to Carat'),  -- Gram to Carat
(4, 5, 0.00220462, 'Convert Carat to Pound'),  -- Carat to Pound
(5, 4, 453.592, 'Convert Pound to Carat'),  -- Pound to Carat
(1, 6, 0.01, 'Convert Gram to Tola'),  -- Gram to Tola
(6, 1, 100, 'Convert Tola to Gram'),  -- Tola to Gram
(1, 7, 0.03527396, 'Convert Gram to Ounce'),  -- Gram to Ounce
(7, 1, 28.3495, 'Convert Ounce to Gram'),  -- Ounce to Gram
(15, 5, 0.0833333, 'Convert Inch to Pound');  -- Inch to Pound
