import os
import shutil
try:
    from bing_image_downloader import downloader
except ImportError:
    print("Please install the downloader first: pip install bing-image-downloader")
    exit()

# Configuration
IMAGE_LIMIT = 200  # Number of images per crop
CROPS = {
    "wheat field close up": "wheat",
    "rice plant leaf close up": "rice",
    "corn maize plant close up": "corn"
}
BASE_DIR = "CropDataset"

def download_and_split():
    if os.path.exists('raw_download'):
        shutil.rmtree('raw_download')
    
    # 1. Download
    for query, folder_name in CROPS.items():
        print(f"\n🌾 Downloading {folder_name} images...")
        downloader.download(query, limit=IMAGE_LIMIT, output_dir='raw_download', adult_filter_off=True, force_replace=False, timeout=60, verbose=False)
        
        # Rename the downloaded folder to a clean name
        if os.path.exists(f"raw_download/{query}"):
            os.rename(f"raw_download/{query}", f"raw_download/{folder_name}")

    # 2. Split
    print("\n📦 Splitting into train / test (80/20)...")
    for split in ['train', 'test']:
        for crop in CROPS.values():
            os.makedirs(f"{BASE_DIR}/{split}/{crop}", exist_ok=True)

    for crop in CROPS.values():
        crop_path = f"raw_download/{crop}"
        if not os.path.exists(crop_path): continue
        
        images = [f for f in os.listdir(crop_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        import random
        random.shuffle(images)
        
        split_idx = int(len(images) * 0.8)
        train_imgs = images[:split_idx]
        test_imgs = images[split_idx:]
        
        for i, img in enumerate(train_imgs):
            shutil.copy2(os.path.join(crop_path, img), os.path.join(BASE_DIR, 'train', crop, f"{crop}_{i}.jpg"))
        for i, img in enumerate(test_imgs):
            shutil.copy2(os.path.join(crop_path, img), os.path.join(BASE_DIR, 'test', crop, f"{crop}_{i}.jpg"))
            
    print(f"\n✅ Dataset generated in {BASE_DIR}/")

if __name__ == '__main__':
    download_and_split()
