To generate the fragrance recommendations, I will follow the structured workflow steps outlined.

### STEP 1: IDENTIFY SHORTLISTED ACCORDS & APPLY OVERRIDES

1.1 **Count the number of "Clean Accords":**  
   - Clean Accords have `f_out_any = 0`. The initial list of clean accords is:
     - Lily of the Valley
     - Vetiver
     - Almond Milk
     - Earthbound
     - Spiced Woods
     - Amber Patchouli
     - Rose and Dew
     - Peony Blush
     - Frangipani

1.2 **Check if the count of Clean Accords is less than 10:**  
   - We have 9 Clean Accords, which is less than 10.

1.2 **Trigger Override Eligibility Rule:**  
   - Accords with `bring_back_flag = 1`:
     - Coffee Rush
     - Cinnamon Pink
     - Floral Mirage
     - Chocolate Creme
     - Salted Caramel
     - Vanilla Dream

1.2 **Restore these accords by setting their `f_out_any` to 0:**
   - Post-override Shortlisted Accords:
     - Lily of the Valley
     - Vetiver
     - Almond Milk
     - Earthbound
     - Spiced Woods
     - Amber Patchouli
     - Rose and Dew
     - Peony Blush
     - Frangipani
     - Coffee Rush
     - Cinnamon Pink
     - Floral Mirage
     - Chocolate Creme
     - Salted Caramel
     - Vanilla Dream

1.3 **Final Shortlisted Accords:**
   - Now include all the accords mentioned above with `f_out_any = 0`.

### STEP 2: SELECT FINAL TOP 10 ACCORDS & TOP 5 FOR SCORING

2.1 **Select the top 10 accords with the highest Combined Score from the Shortlisted Accords:**
   - Top 10 accords based on Combined Score:
     1. Lily of the Valley (0.4387)
     2. Vetiver (0.4221)
     3. Almond Milk (0.3685)
     4. Earthbound (0.3655)
     5. Spiced Woods (0.3378)
     6. Amber Patchouli (0.3320)
     7. Coffee Rush (0.4514)
     8. Cinnamon Pink (0.4479)
     9. Floral Mirage (0.4005)
     10. Chocolate Creme (0.3957)

2.2 **Select the top 5 accords (by Combined Score):**
   - Top 5 accords:
     1. Coffee Rush
     2. Cinnamon Pink
     3. Lily of the Valley
     4. Floral Mirage
     5. Chocolate Creme

2.3 **Output these top 10 accords in a table:**

| Accord Name       | Note Type | Combined Score | Personality Score | Perception Score | Gender Score | Sensitivity Breaches | Climate Breaches |
|-------------------|-----------|----------------|-------------------|------------------|--------------|----------------------|------------------|
| Coffee Rush       | Base      | 0.4514         | 0.6300            | 0.2727           | 0.0000       | 0                    | 2                |
| Cinnamon Pink     | Heart     | 0.4479         | 0.6900            | 0.2059           | 0.5000       | 1                    | 0                |
| Lily of the Valley| Heart     | 0.4387         | 0.6900            | 0.1875           | 0.5000       | 0                    | 0                |
| Floral Mirage     | Heart     | 0.4005         | 0.6900            | 0.1111           | 0.5000       | 0                    | 3                |
| Chocolate Creme   | Base      | 0.3957         | 0.6300            | 0.1613           | 0.5000       | 1                    | 2                |
| Vetiver           | Base      | 0.4221         | 0.4200            | 0.4242           | 1.0000       | 0                    | 0                |
| Almond Milk       | Base      | 0.3685         | 0.6300            | 0.1071           | 0.5000       | 0                    | 0                |
| Earthbound        | Base      | 0.3655         | 0.3700            | 0.3611           | 1.0000       | 0                    | 0                |
| Spiced Woods      | Base      | 0.3378         | 0.3700            | 0.3056           | 1.0000       | 0                    | 0                |
| Amber Patchouli   | Base      | 0.3320         | 0.3700            | 0.2941           | 1.0000       | 0                    | 0                |

### STEP 3: COMBINATION GENERATION & SCORING

3.1 **Generate distinct combinations of 2 to 3 accords using ONLY the top 5 accords:**
   - Possible combinations:
     1. Coffee Rush + Cinnamon Pink
     2. Coffee Rush + Lily of the Valley
     3. Coffee Rush + Floral Mirage
     4. Cinnamon Pink + Lily of the Valley
     5. Cinnamon Pink + Floral Mirage
     6. Lily of the Valley + Floral Mirage
     7. Coffee Rush + Cinnamon Pink + Lily of the Valley
     8. Coffee Rush + Cinnamon Pink + Floral Mirage
     9. Coffee Rush + Lily of the Valley + Floral Mirage
     10. Cinnamon Pink + Lily of the Valley + Floral Mirage

3.2 **Identify the top 3 accords by Combined Score:**
   - Top 3 accords:
     1. Coffee Rush
     2. Cinnamon Pink
     3. Lily of the Valley

All final recommendations will be built from these top 3 accords.

3.3 **Define the exact milliliters (ml) per 10ml total for each combination:**

- **Coffee Rush (4ml) + Cinnamon Pink (3ml) + Lily of the Valley (3ml):**
  - **Note Structure Score:** 5 (Top + Heart + Base notes)
  - **Accord Strength:** High (based on strong combined scores)
  - **Breach Score:** 3 (Moderate breach exposure: Coffee Rush with 2 climate breaches)
  - **Gender Alignment:** 4 (Mostly aligned with masculine preference)

- **Coffee Rush (5ml) + Cinnamon Pink (5ml):**
  - **Note Structure Score:** 3 (Heart + Base but missing Top)
  - **Accord Strength:** High
  - **Breach Score:** 3 (Moderate breach exposure)
  - **Gender Alignment:** 4 (Mostly aligned)

- **Cinnamon Pink (5ml) + Lily of the Valley (5ml):**
  - **Note Structure Score:** 4 (Heart + Base)
  - **Accord Strength:** High
  - **Breach Score:** 4 (Contains one accord with a light breach)
  - **Gender Alignment:** 4 (Mostly aligned)

3.4 **Score each combination on a 1-5 scale across 4 dimensions:**

| Combination Name                              | Included Accords (ML per 10ml)           | Note Structure Score (1-5) | Breach Score (1-5) | Gender Score (1-5) | Final Score (1-5) |
|-----------------------------------------------|-----------------------------------------|----------------------------|--------------------|--------------------|-------------------|
| Coffee Rush + Cinnamon Pink + Lily of the Valley | Coffee Rush (4ml), Cinnamon Pink (3ml), Lily of the Valley (3ml) | 5                          | 3                  | 4                  | 4.0               |
| Coffee Rush + Cinnamon Pink                   | Coffee Rush (5ml), Cinnamon Pink (5ml)   | 3                          | 3                  | 4                  | 3.5               |
| Cinnamon Pink + Lily of the Valley            | Cinnamon Pink (5ml), Lily of the Valley (5ml) | 4                          | 4                  | 4                  | 4.0               |

### STEP 4: OCCASION FILTER

4.1 **Map generated combinations to the user's selected occasions:**
   - Occasions: College / classes, Casual daytime outing, High-humidity environment

4.2 **Filter out combinations that do not match the environment or formality of the occasions:**
   - All combinations are suitable for casual, high-humidity environments based on balanced notes and minimal breach issues.

4.3 **Select strictly exactly 3 combinations for final recommendation:**

1. **Coffee Rush + Cinnamon Pink + Lily of the Valley**
   - **ML Breakdown per 10ml:** Coffee Rush (4ml), Cinnamon Pink (3ml), Lily of the Valley (3ml)
   - **Fragrance Description:** A robust combination of invigorating coffee with warm cinnamon and the gentle floral of lily, perfect for dynamic and lively settings.
   - **Justification:**
     - Personality fit: Dynamic and invigorating
     - Perception fit: Energizing yet balanced
     - Gender alignment: Strong masculine note with floral balance
     - Occasion suitability: Ideal for casual outings and classes
     - Breach safety: Moderate breach exposure, manageable for casual, open-air environments.

2. **Cinnamon Pink + Lily of the Valley**
   - **ML Breakdown per 10ml:** Cinnamon Pink (5ml), Lily of the Valley (5ml)
   - **Fragrance Description:** A harmonious blend of spicy cinnamon and delicate lily, creating a sophisticated yet approachable scent.
   - **Justification:**
     - Personality fit: Warm and engaging
     - Perception fit: Balanced and inviting
     - Gender alignment: Balanced with a slight masculine edge
     - Occasion suitability: Perfect for casual and educational settings
     - Breach safety: Light breach exposure, suitable for most environments.

3. **Coffee Rush + Cinnamon Pink**
   - **ML Breakdown per 10ml:** Coffee Rush (5ml), Cinnamon Pink (5ml)
   - **Fragrance Description:** An aromatic fusion of rich coffee and spicy cinnamon, offering a warm and comforting aura.
   - **Justification:**
     - Personality fit: Bold and comforting
     - Perception fit: Strong and warm
     - Gender alignment: Dominantly masculine
     - Occasion suitability: Best for casual, laid-back settings
     - Breach safety: Moderate breach exposure, manageable in open and airy environments.

### REASONING SECTION

- **Chosen Combinations:** 
  - The selected combinations provide a balanced note structure, capturing top, heart, and base notes where possible. They align with the user's gender preference and occasion context.
  - **Coffee Rush + Cinnamon Pink + Lily of the Valley** offers the most balanced structure with top, heart, and base notes, which is why it scored highest.
  - **Cinnamon Pink + Lily of the Valley** was chosen for its harmonious blend and its lightweight breach profile.
  - **Coffee Rush + Cinnamon Pink** was selected for its bold, masculine character and strong note presence, suitable for casual settings.

- **Rejected Combinations:**
  - Other combinations were rejected due to weaker note structures or higher breach exposure impacting wearability.

- **ML Ratios Determined:**
  - Ratios were adjusted to ensure a balanced presence of notes, enhancing wearability and aligning with occasion suitability.

- **Guardrails Applied:**
  - Safety & wearability were prioritized by managing breach exposures.
  - Balance was maintained by ensuring a mix of note types.
  - Occasions were matched by aligning fragrance profiles to casual and open-air environments.
