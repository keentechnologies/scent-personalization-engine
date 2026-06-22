"use client";

import Image from "next/image";
import {
  ClipboardList,
  Brain,
  FlaskConical,
  Truck,
  ArrowRight,
  User,
  CheckCircle,
  Wind,
  Hourglass,
  Leaf,
} from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-[60px] lg:py-[90px] bg-bg-alt">
      {/* Desktop Layout */}
      <div className="container hidden lg:block">
        <div className="section-head text-center max-w-[640px] mx-auto mb-[56px]">
          <p className="eyebrow justify-center mb-[14px]">How It Works</p>
          <h2 className="heading-serif text-[36px] mb-[14px]">How Crafted Sprays Works</h2>
          <p className="text-text-secondary text-[16px]">From a 5-minute discovery to a personalised fragrance delivered to your door.</p>
        </div>

        {/* Steps Rail */}
        <div className="steps-rail grid grid-cols-4 gap-[50px] mb-[40px]">
          {/* Step 1 */}
          <div className="step relative flex items-start gap-[14px] text-left pr-[22px]">
            <div className="step-arrow absolute top-[14px] left-[100%] w-[22px] text-gold">
              <ArrowRight className="w-[22px] h-[22px]" />
            </div>
            <div className="step-icon w-[48px] h-[48px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold bg-bg">
              <ClipboardList className="w-[22px] h-[22px]" />
            </div>
            <div>
              <p className="text-gold heading-serif step-num text-[22px] mb-[8px]">01</p>
              <p className="step-title text-[15px] font-semibold mb-[6px]">Take The Discovery</p>
              <p className="text-text-secondary step-sub text-[12.5px] leading-[1.6]">
                Answer a few quick questions about your personality, preferences, lifestyle and the impression you want to leave.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step relative flex items-start gap-[14px] text-left pr-[22px]">
            <div className="step-arrow absolute top-[14px] left-[100%] w-[22px] text-gold">
              <ArrowRight className="w-[22px] h-[22px]" />
            </div>
            <div className="step-icon w-[48px] h-[48px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold bg-bg">
              <Brain className="w-[22px] h-[22px]" />
            </div>
            <div>
              <p className="text-gold heading-serif step-num text-[22px] mb-[8px]">02</p>
              <p className="step-title text-[15px] font-semibold mb-[6px]">We Build Your Profile</p>
              <p className="text-text-secondary step-sub text-[12.5px] leading-[1.6]">
                Our analysis builds a fragrance profile that is uniquely yours so you and your impression are perfectly aligned.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step relative flex items-start gap-[14px] text-left pr-[22px]">
            <div className="step-arrow absolute top-[14px] left-[100%] w-[22px] text-gold">
              <ArrowRight className="w-[22px] h-[22px]" />
            </div>
            <div className="step-icon w-[48px] h-[48px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold bg-bg">
              <FlaskConical className="w-[22px] h-[22px]" />
            </div>
            <div>
              <p className="text-gold heading-serif step-num text-[22px] mb-[8px]">03</p>
              <p className="step-title text-[15px] font-semibold mb-[6px]">Your Formula Is Crafted</p>
              <p className="text-text-secondary step-sub text-[12.5px] leading-[1.6]">
                Our perfumers craft your formula using expert ingredient selection, blending it precisely for you.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="step relative flex items-start gap-[14px] text-left">
            <div className="step-icon w-[48px] h-[48px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold bg-bg">
              <Truck className="w-[22px] h-[22px]" />
            </div>
            <div>
              <p className="text-gold heading-serif step-num text-[22px] mb-[8px]">04</p>
              <p className="step-title text-[15px] font-semibold mb-[6px]">Delivered In 4 Days</p>
              <p className="text-text-secondary step-sub text-[12.5px] leading-[1.6]">
                Your personalised fragrance is manufactured, packed and sent to your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Cards Row */}
        <div className="cards-row4 grid grid-cols-4 gap-[18px] mt-[48px]">
          {/* Card 1 */}
          <div className="card hiw-card p-[22px] flex flex-col bg-card">
            <p className="eyebrow mb-[16px]">What You Share</p>
            <div className="hiw-list flex flex-col gap-[10px] flex-grow">
              <div className="hiw-list-item flex items-center gap-[8px] text-[13.5px]">
                <CheckCircle className="w-[16px] h-[16px] text-gold flex-shrink-0" />
                <span className="text-text-secondary">Personality</span>
              </div>
              <div className="hiw-list-item flex items-center gap-[8px] text-[13.5px]">
                <CheckCircle className="w-[16px] h-[16px] text-gold flex-shrink-0" />
                <span className="text-text-secondary">Scent Preferences</span>
              </div>
              <div className="hiw-list-item flex items-center gap-[8px] text-[13.5px]">
                <CheckCircle className="w-[16px] h-[16px] text-gold flex-shrink-0" />
                <span className="text-text-secondary">Lifestyle</span>
              </div>
              <div className="hiw-list-item flex items-center gap-[8px] text-[13.5px]">
                <CheckCircle className="w-[16px] h-[16px] text-gold flex-shrink-0" />
                <span className="text-text-secondary">Occasions</span>
              </div>
              <div className="hiw-list-item flex items-center gap-[8px] text-[13.5px]">
                <CheckCircle className="w-[16px] h-[16px] text-gold flex-shrink-0" />
                <span className="text-text-secondary">Climate</span>
              </div>
              <div className="hiw-list-item flex items-center gap-[8px] text-[13.5px]">
                <CheckCircle className="w-[16px] h-[16px] text-gold flex-shrink-0" />
                <span className="text-text-secondary">Desired Impression</span>
              </div>
            </div>
            <hr className="divider my-[14px]" />
            <div className="hiw-foot flex justify-between text-[11px] text-text-secondary">
              <span>5 Minutes</span>
              <span>50+ Data Points</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card hiw-card p-[22px] flex flex-col bg-card">
            <p className="eyebrow mb-[16px]">Your Fragrance Profile</p>
            <div className="flex-grow flex flex-col justify-center border border-border rounded-[10px] p-[16px] bg-bg-alt">
              <div className="flex justify-between items-center mb-[10px]">
                <h4 className="heading-serif text-[15px] font-medium">Kunaal&apos;s Profile</h4>
                <div className="w-[26px] h-[26px] rounded-full border border-border flex items-center justify-center text-gold">
                  <User className="w-[12px] h-[12px]" />
                </div>
              </div>
              <p className="eyebrow text-[10px] mb-[8px]">Personality</p>
              
              <div className="trait mb-[6px]">
                <div className="flex justify-between text-[11px] mb-[2px]">
                  <span className="text-text-secondary">Minimalist</span>
                  <span className="text-text-secondary">70%</span>
                </div>
                <div className="h-[4px] rounded-[3px] bg-border overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: "70%" }} />
                </div>
              </div>

              <div className="trait mb-[6px]">
                <div className="flex justify-between text-[11px] mb-[2px]">
                  <span className="text-text-secondary">Power Player</span>
                  <span className="text-text-secondary">60%</span>
                </div>
                <div className="h-[4px] rounded-[3px] bg-border overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: "60%" }} />
                </div>
              </div>

              <div className="trait mb-[6px]">
                <div className="flex justify-between text-[11px] mb-[2px]">
                  <span className="text-text-secondary">Playful Energiser</span>
                  <span className="text-text-secondary">80%</span>
                </div>
                <div className="h-[4px] rounded-[3px] bg-border overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: "80%" }} />
                </div>
              </div>

              <p className="eyebrow text-[10px] mt-[10px] mb-[6px]">Fragrance Family</p>
              <p className="heading-serif text-gold text-[14px]">Fresh Woody Citrus</p>
            </div>
            <hr className="divider my-[14px]" />
            <div className="hiw-foot flex justify-between text-[11px] text-text-secondary">
              <span>AI Analysed</span>
              <span>Built Around You</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card hiw-card p-[22px] flex flex-col bg-card">
            <p className="eyebrow mb-[16px]">Your Formula Is Crafted</p>
            <div className="flex-grow flex flex-row gap-[10px] items-stretch min-h-[140px]">
              <div className="relative w-[50px] flex-shrink-0">
                <Image
                  src="/assets/scent-pyramid-tight.png"
                  alt="Pyramid"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between text-[11px]">
                <div>
                  <p className="font-semibold text-text-primary">Top Notes</p>
                  <p className="text-text-secondary">Bergamot, Lemon</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Heart Notes</p>
                  <p className="text-text-secondary">Lavender, Ginger</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Base Notes</p>
                  <p className="text-text-secondary">Cedarwood, Vetiver</p>
                </div>
              </div>
            </div>

            {/* Icons row */}
            <div className="flex justify-between gap-[4px] mt-[14px]">
              <span className="flex items-center gap-[4px] text-[9.5px] text-text-secondary min-w-0">
                <span className="w-[20px] h-[20px] rounded-full border border-border flex items-center justify-center text-gold"><Wind className="w-[10px] h-[10px]" /></span>
                <span>Proj.<br />Mod.</span>
              </span>
              <span className="flex items-center gap-[4px] text-[9.5px] text-text-secondary min-w-0">
                <span className="w-[20px] h-[20px] rounded-full border border-border flex items-center justify-center text-gold"><Hourglass className="w-[10px] h-[10px]" /></span>
                <span>Long.<br />8+ Hrs</span>
              </span>
              <span className="flex items-center gap-[4px] text-[9.5px] text-text-secondary min-w-0">
                <span className="w-[20px] h-[20px] rounded-full border border-border flex items-center justify-center text-gold"><Leaf className="w-[10px] h-[10px]" /></span>
                <span>Season.<br />Spr/Sum</span>
              </span>
            </div>

            <hr className="divider my-[14px]" />
            <div className="hiw-foot flex justify-between text-[11px] text-text-secondary">
              <span>Crafted For You</span>
              <span>By Expert Perfumers</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card hiw-card p-[22px] flex flex-col bg-card">
            <p className="eyebrow mb-[16px]">Delivered To You</p>
            <div className="flex-grow relative h-[105px] w-full rounded-[10px] overflow-hidden mb-[10px]">
              <Image
                src="/assets/bottle-in-box.png"
                alt="Personalised perfume in box"
                fill
                className="object-cover"
              />
            </div>
            <hr className="divider my-[14px]" />
            <div className="hiw-foot flex justify-between text-[11px] text-text-secondary mt-auto">
              <span>Delivered In 4 Days</span>
              <span>At Your Doorstep</span>
            </div>
          </div>
        </div>

        {/* Tagline Block */}
        <div className="tagline-block text-center mt-[50px] pt-[36px] border-t border-border">
          <p className="text-[14px] mb-[6px] text-text-secondary">
            <span className="text-gold font-semibold">Real answers.</span> Intelligent analysis. Expert craftsmanship.
          </p>
          <p className="heading-serif text-[18px]">
            A fragrance that feels like it was always meant for you.
          </p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="container block lg:hidden">
        <div className="mobile-hiw-extra">
          {/* Header */}
          <div className="text-center mb-[32px]">
            <p className="eyebrow justify-center mb-[10px]">How It Works</p>
            <h2 className="heading-serif text-[26px] leading-[1.2] m-0">
              How Crafted Sprays Works
            </h2>
            <p className="text-text-secondary text-[13px] leading-[1.55] mt-[12px]">
              A complete custom fragrance journey made simple.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="mobile-hiw-timeline relative pl-[42px]">
            {/* Step 1 */}
            <div className="mobile-hiw-step relative mb-[18px]">
              <div className="mobile-hiw-num absolute left-[-42px] top-0 w-[30px] h-[30px] rounded-full border border-gold flex items-center justify-center text-[11.5px] color-gold bg-[#151311] z-[2] font-semibold text-gold">
                01
              </div>
              <div className="mobile-hiw-line absolute left-[-27px] top-[30px] bottom-[-18px] w-[1px] bg-gold/40 z-[1]" />
              
              <div className="mobile-hiw-card card p-[12px_14px] bg-[#24201d] overflow-hidden rounded-[12px]">
                <div className="mhiw-row flex gap-[14px] items-start">
                  <div className="mhiw-text flex-[0.82] min-w-0">
                    <h4 className="mobile-hiw-title text-[14.5px] font-semibold mb-[2px]">Take The Discovery</h4>
                    <p className="mobile-hiw-sub text-[10.5px] leading-[1.35] text-text-secondary mb-0">
                      Answer a few quick questions about your traits, scent likes/dislikes and environments.
                    </p>
                  </div>
                  <div className="mhiw-visual flex-[1.18] min-w-0">
                    {/* Discovery Phone Mock */}
                    <div className="mhiw-phone flex flex-col gap-[8px]">
                      <div className="mhiw-phone-mock border border-border rounded-[12px] p-[10px] bg-white/[0.02]">
                        <p className="mhiw-phone-q text-[11px] leading-[1.35] mb-[8px] font-semibold">Which describes you best?</p>
                        <div className="mhiw-chips grid grid-cols-2 gap-[6px]">
                          <span className="mhiw-chip active text-[9.5px] p-[5px_4px] rounded-[20px] border border-gold bg-gold text-[#1a1410] text-center font-semibold">Minimalist</span>
                          <span className="mhiw-chip text-[9.5px] p-[5px_4px] rounded-[20px] border border-border text-text-secondary text-center">Bold Player</span>
                          <span className="mhiw-chip text-[9.5px] p-[5px_4px] rounded-[20px] border border-border text-text-secondary text-center">Energiser</span>
                          <span className="mhiw-chip text-[9.5px] p-[5px_4px] rounded-[20px] border border-border text-text-secondary text-center">Creative</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mobile-hiw-step relative mb-[18px]">
              <div className="mobile-hiw-num absolute left-[-42px] top-0 w-[30px] h-[30px] rounded-full border border-gold flex items-center justify-center text-[11.5px] color-gold bg-[#151311] z-[2] font-semibold text-gold">
                02
              </div>
              <div className="mobile-hiw-line absolute left-[-27px] top-[30px] bottom-[-18px] w-[1px] bg-gold/40 z-[1]" />

              <div className="mobile-hiw-card card p-[12px_14px] bg-[#24201d] overflow-hidden rounded-[12px]">
                <div className="mhiw-row flex gap-[14px] items-start">
                  <div className="mhiw-text flex-[0.82] min-w-0">
                    <h4 className="mobile-hiw-title text-[14.5px] font-semibold mb-[2px]">Build Profile</h4>
                    <p className="mobile-hiw-sub text-[10.5px] leading-[1.35] text-text-secondary mb-0">
                      Our system analyses your 50+ data points to define your optimal fragrance direction.
                    </p>
                  </div>
                  <div className="mhiw-visual flex-[1.18] min-w-0">
                    {/* Kunaal Profile card mockup */}
                    <div className="mhiw-profile-card border border-border rounded-[12px] p-[10px] bg-white/[0.02]">
                      <div className="mhiw-profile-head flex justify-between items-center mb-[8px] gap-[6px]">
                        <p className="mhiw-profile-title text-[10.5px] text-gold font-semibold">Your Profile</p>
                        <div className="mhiw-profile-avatar w-[24px] h-[24px] rounded-full border border-border flex items-center justify-center text-text-primary">
                          <User className="w-[12px] h-[12px]" />
                        </div>
                      </div>
                      <div className="mhiw-bar-row flex items-center gap-[7px] mb-[7px] text-[10px]">
                        <span className="mhiw-bar-label w-[36px] flex-shrink-0 text-text-secondary">Minim.</span>
                        <div className="mhiw-bar-bg flex-1 h-[4px] rounded-[3px] bg-border overflow-hidden">
                          <div className="mhiw-bar-fill h-full bg-gold" style={{ width: "70%" }} />
                        </div>
                      </div>
                      <div className="mhiw-bar-row flex items-center gap-[7px] mb-[7px] text-[10px]">
                        <span className="mhiw-bar-label w-[36px] flex-shrink-0 text-text-secondary">Player</span>
                        <div className="mhiw-bar-bg flex-1 h-[4px] rounded-[3px] bg-border overflow-hidden">
                          <div className="mhiw-bar-fill h-full bg-gold" style={{ width: "60%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mobile-hiw-step relative mb-[18px]">
              <div className="mobile-hiw-num absolute left-[-42px] top-0 w-[30px] h-[30px] rounded-full border border-gold flex items-center justify-center text-[11.5px] color-gold bg-[#151311] z-[2] font-semibold text-gold">
                03
              </div>
              <div className="mobile-hiw-line absolute left-[-27px] top-[30px] bottom-[-18px] w-[1px] bg-gold/40 z-[1]" />

              <div className="mobile-hiw-card card p-[12px_14px] bg-[#24201d] overflow-hidden rounded-[12px]">
                <div className="mhiw-row flex gap-[14px] items-start">
                  <div className="mhiw-text flex-[0.82] min-w-0">
                    <h4 className="mobile-hiw-title text-[14.5px] font-semibold mb-[2px]">Formula Crafted</h4>
                    <p className="mobile-hiw-sub text-[10.5px] leading-[1.35] text-text-secondary mb-0">
                      Our perfumers formulate and blend your signature scent using highest grade oils.
                    </p>
                  </div>
                  <div className="mhiw-visual flex-[1.18] min-w-0">
                    {/* Scent pyramid graphics */}
                    <div className="mhiw-pyramid-row flex items-center gap-[6px] justify-between">
                      <Image
                        src="/assets/scent-pyramid-tight.png"
                        alt="Pyramid graphic"
                        width={46}
                        height={70}
                        className="w-[46px] h-auto"
                      />
                      <div className="mhiw-notes flex flex-col gap-[4px] text-[10.5px]">
                        <div>
                          <p className="mhiw-note-label text-[8px] uppercase text-gold">Top</p>
                          <p className="mhiw-note-val font-semibold">Bergamot</p>
                        </div>
                        <div>
                          <p className="mhiw-note-label text-[8px] uppercase text-gold">Base</p>
                          <p className="mhiw-note-val font-semibold">Cedarwood</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mobile-hiw-step relative">
              <div className="mobile-hiw-num absolute left-[-42px] top-0 w-[30px] h-[30px] rounded-full border border-gold flex items-center justify-center text-[11.5px] color-gold bg-[#151311] z-[2] font-semibold text-gold">
                04
              </div>

              <div className="mobile-hiw-card card p-[12px_14px] bg-[#24201d] overflow-hidden rounded-[12px]">
                <div className="mhiw-row flex gap-[14px] items-start">
                  <div className="mhiw-text flex-[0.82] min-w-0">
                    <h4 className="mobile-hiw-title text-[14.5px] font-semibold mb-[2px]">Delivered to You</h4>
                    <p className="mobile-hiw-sub text-[10.5px] leading-[1.35] text-text-secondary mb-0">
                      Manufactured, quality checked and delivered to your doorstep in 4 days.
                    </p>
                  </div>
                  <div className="mhiw-visual flex-[1.18] min-w-0">
                    <div className="mhiw-box-img rounded-[8px] overflow-hidden relative h-[64px] w-full">
                      <Image
                        src="/assets/bottle-in-box.png"
                        alt="Delivered product"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom details summary */}
          <div className="mhiw-bottom flex items-start justify-between mt-[24px] px-[6px]">
            <div className="mhiw-bottom-item flex flex-col items-center gap-[6px] text-center">
              <p className="text-[11px] font-bold text-text-primary">5 Minutes</p>
              <span className="text-[9.5px] text-text-secondary">Take Discovery</span>
            </div>
            <ArrowRight className="w-[12px] h-[12px] text-gold mt-[11px] opacity-70 flex-shrink-0" />
            <div className="mhiw-bottom-item flex flex-col items-center gap-[6px] text-center">
              <p className="text-[11px] font-bold text-text-primary">AI Analysis</p>
              <span className="text-[9.5px] text-text-secondary">Create Profile</span>
            </div>
            <ArrowRight className="w-[12px] h-[12px] text-gold mt-[11px] opacity-70 flex-shrink-0" />
            <div className="mhiw-bottom-item flex flex-col items-center gap-[6px] text-center">
              <p className="text-[11px] font-bold text-text-primary">4 Days</p>
              <span className="text-[9.5px] text-text-secondary">Doorstep Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
