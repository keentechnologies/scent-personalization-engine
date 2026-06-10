import math

import pandas as pd

from pathlib import Path

from sqlalchemy import create_engine

from app.core.config import settings


DATABASE_URL = settings.DATABASE_URL

engine = create_engine(DATABASE_URL)


BASE_DIR = Path(__file__).resolve().parent

INPUT_CSV_PATH = (
    BASE_DIR / "pincode_master_raw.csv"
)

OUTPUT_CSV_PATH = (
    BASE_DIR / "pincode_master_enriched.csv"
)


def haversine_distance(
    lat1,
    lon1,
    lat2,
    lon2,
):

    earth_radius_km = 6371

    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    delta_lat = lat2 - lat1
    delta_lon = lon2 - lon1

    a = (
        math.sin(delta_lat / 2) ** 2
        + math.cos(lat1)
        * math.cos(lat2)
        * math.sin(delta_lon / 2) ** 2
    )

    c = 2 * math.atan2(
        math.sqrt(a),
        math.sqrt(1 - a),
    )

    return earth_radius_km * c


def generate_pincode_zone_mapping():

    pincode_dataframe = pd.read_csv(
        INPUT_CSV_PATH,
    )

    pincode_dataframe.columns = (
        pincode_dataframe.columns
        .str.strip()
        .str.lower()
    )

    pincode_dataframe = pincode_dataframe.rename(
        columns={
            "pincode": "pincode",
            "lat": "latitude",
            "long": "longitude",
        },
    )

    zone_dataframe = pd.read_sql(
        "SELECT zone_id, latitude, longitude FROM master_zone_table",
        engine,
    )

    enriched_rows = []

    for _, pincode_row in (
        pincode_dataframe.iterrows()
    ):

        pincode_latitude = float(
            pincode_row["latitude"]
        )

        pincode_longitude = float(
            pincode_row["longitude"]
        )

        nearest_zone_id = None

        minimum_distance = float("inf")

        for _, zone_row in (
            zone_dataframe.iterrows()
        ):

            distance = haversine_distance(
                pincode_latitude,
                pincode_longitude,
                float(zone_row["latitude"]),
                float(zone_row["longitude"]),
            )

            if distance < minimum_distance:

                minimum_distance = distance

                nearest_zone_id = (
                    zone_row["zone_id"]
                )

        enriched_rows.append({
            "pincode": str(
                int(pincode_row["pincode"])
            ),
            "latitude": pincode_latitude,
            "longitude": pincode_longitude,
            "zone_id": nearest_zone_id,
        })

    enriched_dataframe = pd.DataFrame(
        enriched_rows,
    )

    enriched_dataframe.to_csv(
        OUTPUT_CSV_PATH,
        index=False,
    )

    print(
        f"Successfully generated {len(enriched_dataframe)} pincode mappings"
    )

    print(
        f"Output saved to: {OUTPUT_CSV_PATH}"
    )


if __name__ == "__main__":

    generate_pincode_zone_mapping()