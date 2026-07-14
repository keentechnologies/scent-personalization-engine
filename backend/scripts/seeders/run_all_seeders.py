import sys
import os

# Ensure the root app directory is in sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

# Import all seeder functions
from scripts.seeders.load_master_accord_table import load_master_accord_table
from scripts.seeders.load_master_climate_table import load_master_climate_table
from scripts.seeders.load_master_gender_table import load_master_gender_table
from scripts.seeders.load_master_perception_table import load_master_perception_table
from scripts.seeders.load_master_personality_table import load_master_personality_table
from scripts.seeders.load_master_sensitivity_table import load_master_sensitivity_table
from scripts.seeders.load_master_zone_table import load_master_zone_table

from scripts.seeders.load_master_climate_accord_mapping import load_master_climate_accord_mapping
from scripts.seeders.load_master_perception_accord_mapping import load_master_perception_accord_mapping
from scripts.seeders.load_master_personality_accord_mapping import load_master_personality_accord_mapping
from scripts.seeders.load_master_sensitivity_accord_mapping import load_master_sensitivity_accord_mapping
from scripts.seeders.load_master_zone_climate_table import load_master_zone_climate_table
from scripts.seeders.load_pincode_city_state_mapping_table import load_pincode_city_state_mapping_table
from scripts.seeders.load_pincode_zoneid_mapping_table import load_pincode_zoneid_mapping_table

def run_all():
    print("=" * 60)
    print("STARTING DATABASE SEEDING PROCESS")
    print("=" * 60)

    seeders = [
        # Independent Master Tables
        ("Master Accord Table", load_master_accord_table),
        ("Master Climate Table", load_master_climate_table),
        ("Master Gender Table", load_master_gender_table),
        ("Master Perception Table", load_master_perception_table),
        ("Master Personality Table", load_master_personality_table),
        ("Master Sensitivity Table", load_master_sensitivity_table),
        ("Master Zone Table", load_master_zone_table),

        # Dependent Mapping Tables / Specialized Tables
        ("Master Climate Accord Mapping", load_master_climate_accord_mapping),
        ("Master Perception Accord Mapping", load_master_perception_accord_mapping),
        ("Master Personality Accord Mapping", load_master_personality_accord_mapping),
        ("Master Sensitivity Accord Mapping", load_master_sensitivity_accord_mapping),
        ("Master Zone Climate Table", load_master_zone_climate_table),
        ("Pincode City State Mapping Table", load_pincode_city_state_mapping_table),
        ("Pincode ZoneID Mapping Table", load_pincode_zoneid_mapping_table),
    ]

    success_count = 0
    failed_seeders = []

    for name, func in seeders:
        print(f"\n---> Running: {name}...")
        try:
            func()
            print(f"[SUCCESS] Finished: {name}")
            success_count += 1
        except Exception as e:
            print(f"[FAILED] Error running {name}: {e}")
            failed_seeders.append((name, e))

    print("\n" + "=" * 60)
    print("SEEDING SUMMARY")
    print("=" * 60)
    print(f"Total seeders run: {len(seeders)}")
    print(f"Successful: {success_count}/{len(seeders)}")
    
    if failed_seeders:
        print(f"Failed: {len(failed_seeders)}")
        for name, err in failed_seeders:
            print(f"  - {name}: {err}")
        sys.exit(1)
    else:
        print("All data seeded successfully!")
        sys.exit(0)

if __name__ == "__main__":
    run_all()
