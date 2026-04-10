-- 0020_gallery_images.sql
-- DB Schema Extension for Gallery Multi Image Upload

-- 1. Extend galleries table to include an array of image metadata
ALTER TABLE public.galleries
ADD COLUMN IF NOT EXISTS images_json JSONB DEFAULT '[]'::jsonb;
