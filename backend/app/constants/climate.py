import enum

class ClimateKey(str, enum.Enum):
    HHY = "HHY"
    HHN = "HHN"
    HMY = "HMY"
    HMN = "HMN"
    HLY = "HLY"
    HLN = "HLN"
    MHY = "MHY"
    MHN = "MHN"
    MMY = "MMY"
    MMN = "MMN"
    MLY = "MLY"
    MLN = "MLN"
    CHY = "CHY"
    CHN = "CHN"
    CMY = "CMY"
    CMN = "CMN"
    CLY = "CLY"
    CLN = "CLN"

CLIMATE_DISPLAY_NAMES = {
    ClimateKey.HHY: "Hot, High Humidity, Yes Rain",
    ClimateKey.HHN: "Hot, High Humidity, No Rain",
    ClimateKey.HMY: "Hot, Medium Humidity, Yes Rain",
    ClimateKey.HMN: "Hot, Medium Humidity, No Rain",
    ClimateKey.HLY: "Hot, Low Humidity, Yes Rain",
    ClimateKey.HLN: "Hot, Low Humidity, No Rain",
    ClimateKey.MHY: "Mild, High Humidity, Yes Rain",
    ClimateKey.MHN: "Mild, High Humidity, No Rain",
    ClimateKey.MMY: "Mild, Medium Humidity, Yes Rain",
    ClimateKey.MMN: "Mild, Medium Humidity, No Rain",
    ClimateKey.MLY: "Mild, Low Humidity, Yes Rain",
    ClimateKey.MLN: "Mild, Low Humidity, No Rain",
    ClimateKey.CHY: "Cold, High Humidity, Yes Rain",
    ClimateKey.CHN: "Cold, High Humidity, No Rain",
    ClimateKey.CMY: "Cold, Medium Humidity, Yes Rain",
    ClimateKey.CMN: "Cold, Medium Humidity, No Rain",
    ClimateKey.CLY: "Cold, Low Humidity, Yes Rain",
    ClimateKey.CLN: "Cold, Low Humidity, No Rain",
}

CLIMATE_KEY_TO_EXCEL_COL = {
    ClimateKey.HHY: "Hot-High-Yes",
    ClimateKey.HHN: "Hot-High-No",
    ClimateKey.HMY: "Hot-High-Yes",
    ClimateKey.HMN: "Hot-High-No",
    ClimateKey.HLY: "Hot-High-Yes",
    ClimateKey.HLN: "Hot-Low-No",

    ClimateKey.MHY: "Mild-High-Yes",
    ClimateKey.MHN: "Mild-High-No",
    ClimateKey.MMY: "Mild-High-Yes",
    ClimateKey.MMN: "Mild-High-No",
    ClimateKey.MLY: "Mild-High-Yes",
    ClimateKey.MLN: "Any (Indoor)-Low-No",

    ClimateKey.CHY: "Cold-High-Yes",
    ClimateKey.CHN: "Cold-High-Yes",
    ClimateKey.CMY: "Cold-High-Yes",
    ClimateKey.CMN: "Cold-Low-No",
    ClimateKey.CLY: "Cold-High-Yes",
    ClimateKey.CLN: "Cold-Low-No",
}
