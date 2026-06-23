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
import { motion, Variants } from "framer-motion";

// Desktop Animation Variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: [0.25, 1, 0.5, 1] },
  },
};

const arrowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, x: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const threadVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 2.0, ease: "easeInOut" },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -70,
    scaleY: 0.6,
    transformPerspective: 1200,
    transformOrigin: "top center",
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    scaleY: 1,
    transformPerspective: 1200,
    transformOrigin: "top center",
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

// Mobile Animation Variants
const mobileTimelineVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const mobileStepVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const mobileNumVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 3, ease: "easeOut" },
  },
};

const mobileLineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 3, ease: "easeInOut" },
  },
};

const mobileCardVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -70,
    scaleX: 0.6,
    transformPerspective: 1200,
    transformOrigin: "left center",
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    scaleX: 1,
    transformPerspective: 1200,
    transformOrigin: "left center",
    transition: {
      duration: 5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-[60px] lg:py-[90px] bg-bg-alt">
      <div className="absolute inset-0 hidden lg:block z-0">
        <Image
          src="/assets/how-it-works-bg-desktop.png"
          alt="Perfume bottle with fragrance ingredients"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 block lg:hidden z-0">
        <Image
          src="/assets/how-it-works-bg-mobile.png"
          alt="Perfume bottle with scent blotters and ingredients"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-[#1d1a17]/70 lg:bg-[#1d1a17]/62" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_82%_58%,rgba(196,130,58,0.12),transparent_34%),linear-gradient(180deg,rgba(21,19,17,0.82)_0%,rgba(29,26,23,0.58)_42%,rgba(21,19,17,0.92)_100%)] lg:bg-[radial-gradient(circle_at_82%_54%,rgba(196,130,58,0.16),transparent_30%),linear-gradient(90deg,rgba(21,19,17,0.96)_0%,rgba(21,19,17,0.86)_38%,rgba(21,19,17,0.65)_72%,rgba(21,19,17,0.82)_100%)]" />
      {/* Desktop Layout */}
      <div className="container relative z-10 hidden lg:block">
        <div className="section-head text-center max-w-[640px] mx-auto mb-[56px]">
          <p className="eyebrow justify-center mb-[14px]">How It Works</p>
          <h2 className="heading-serif text-[36px] mb-[14px]">How Crafted Sprays Works</h2>
          <p className="text-text-secondary text-[16px]">From a 5-minute discovery to a personalised fragrance delivered to your door.</p>
        </div>

        {/* Steps Rail */}
        <motion.div
          className="steps-rail grid grid-cols-4 gap-[50px] mb-[40px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Step 1 */}
          <motion.div variants={stepVariants} className="step relative flex items-start gap-[14px] text-left pr-[22px]">
            <motion.div variants={arrowVariants} className="step-arrow absolute top-[14px] left-[100%] w-[22px] text-gold">
              <ArrowRight className="w-[22px] h-[22px]" />
            </motion.div>
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
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={stepVariants} className="step relative flex items-start gap-[14px] text-left pr-[22px]">
            <motion.div variants={arrowVariants} className="step-arrow absolute top-[14px] left-[100%] w-[22px] text-gold">
              <ArrowRight className="w-[22px] h-[22px]" />
            </motion.div>
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
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={stepVariants} className="step relative flex items-start gap-[14px] text-left pr-[22px]">
            <motion.div variants={arrowVariants} className="step-arrow absolute top-[14px] left-[100%] w-[22px] text-gold">
              <ArrowRight className="w-[22px] h-[22px]" />
            </motion.div>
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
          </motion.div>

          {/* Step 4 */}
          <motion.div variants={stepVariants} className="step relative flex items-start gap-[14px] text-left">
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
          </motion.div>
        </motion.div>

        {/* Detailed Cards Row Wrapper */}
        <motion.div
          className="relative mt-[48px]"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Thread Line and Nodes container */}
          <div className="absolute top-[8px] left-0 right-0 h-[2px] hidden lg:block z-0">
            {/* Background Track Line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-0 h-[2px] bg-white/[0.04]" />
            {/* Animated Thread Line */}
            <motion.div
              className="absolute left-[12.5%] right-[12.5%] top-0 h-[2px] bg-gradient-to-r from-gold/40 via-gold to-gold/40 origin-left"
              variants={threadVariants}
            />
            {/* Nodes Grid */}
            <div className="absolute left-0 right-0 top-[-3px] grid grid-cols-4 gap-[18px] pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex justify-center">
                  <motion.div
                    className="w-[8px] h-[8px] rounded-full bg-gold border border-[#151311] shadow-[0_0_8px_#c4823a]"
                    variants={{
                      hidden: { scale: 0 },
                      visible: {
                        scale: 1,
                        transition: { delay: i * 0.5, duration: 0.5, ease: "easeOut" }
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="cards-row4 grid grid-cols-4 gap-[18px] relative z-10 pt-[24px]">
            {/* Card 1 */}
            <motion.div variants={cardVariants} className="card hiw-card p-[22px] flex flex-col bg-card">
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
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={cardVariants} className="card hiw-card p-[22px] flex flex-col bg-card">
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
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={cardVariants} className="card hiw-card p-[22px] flex flex-col bg-card text-center">
              <p className="eyebrow justify-center mb-[18px] w-full text-center">Your Formula Is Crafted</p>
              <div className="flex-grow flex flex-col justify-between gap-[8px] py-[4px]">
                {/* Top Notes */}
                <div className="flex flex-col items-center">
                  <div className="relative w-[96px] h-[36px] overflow-hidden mb-[6px]">
                    <div className="absolute top-0 left-0 w-full h-[84px]">
                      <Image
                        src="/assets/scent-pyramid-tight.png"
                        alt="Top Notes Scent Pyramid"
                        fill
                        sizes="96px"
                        className="object-contain object-top"
                        priority
                      />
                    </div>
                  </div>
                  <h4 className="font-semibold text-text-primary text-[13px] leading-[1.3]">Top Notes</h4>
                  <p className="text-text-secondary text-[11.5px] leading-[1.3] mt-[2px]">Bergamot, Lemon</p>
                </div>

                {/* Heart Notes */}
                <div className="flex flex-col items-center">
                  <div className="relative w-[96px] h-[24px] overflow-hidden mb-[6px]">
                    <div className="absolute top-[-36px] left-0 w-full h-[84px]">
                      <Image
                        src="/assets/scent-pyramid-tight.png"
                        alt="Heart Notes Scent Pyramid"
                        fill
                        sizes="96px"
                        className="object-contain object-top"
                        priority
                      />
                    </div>
                  </div>
                  <h4 className="font-semibold text-text-primary text-[13px] leading-[1.3]">Heart Notes</h4>
                  <p className="text-text-secondary text-[11.5px] leading-[1.3] mt-[2px]">Lavender, Ginger</p>
                </div>

                {/* Base Notes */}
                <div className="flex flex-col items-center">
                  <div className="relative w-[96px] h-[28px] overflow-hidden mb-[6px]">
                    <div className="absolute top-[-59px] left-0 w-full h-[84px]">
                      <Image
                        src="/assets/scent-pyramid-tight.png"
                        alt="Base Notes Scent Pyramid"
                        fill
                        sizes="96px"
                        className="object-contain object-top"
                        priority
                      />
                    </div>
                  </div>
                  <h4 className="font-semibold text-text-primary text-[13px] leading-[1.3]">Base Notes</h4>
                  <p className="text-text-secondary text-[11.5px] leading-[1.3] mt-[2px]">Cedarwood, Vetiver</p>
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
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={cardVariants} className="card hiw-card p-[22px] flex flex-col bg-card">
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
            </motion.div>
          </div>
        </motion.div>

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
      <div className="container relative z-10 block lg:hidden">
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
          <motion.div
            className="mobile-hiw-timeline relative pl-[42px]"
            variants={mobileTimelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Step 1 */}
            <motion.div
              className="mobile-hiw-step relative mb-[18px]"
              variants={mobileStepVariants}
            >
              <motion.div
                variants={mobileNumVariants}
                className="mobile-hiw-num absolute left-[-42px] top-0 w-[30px] h-[30px] rounded-full border border-gold flex items-center justify-center text-[11.5px] color-gold bg-[#151311] z-[2] font-semibold text-gold"
              >
                01
              </motion.div>
              <div className="mobile-hiw-line absolute left-[-27px] top-[30px] bottom-[-18px] w-[1px] bg-gold/15 z-[1]">
                <motion.div
                  variants={mobileLineVariants}
                  className="w-full h-full bg-gold origin-top"
                />
              </div>
              
              <motion.div
                variants={mobileCardVariants}
                className="mobile-hiw-card card p-[12px_14px] bg-[#24201d] overflow-hidden rounded-[12px]"
              >
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
              </motion.div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="mobile-hiw-step relative mb-[18px]"
              variants={mobileStepVariants}
            >
              <motion.div
                variants={mobileNumVariants}
                className="mobile-hiw-num absolute left-[-42px] top-0 w-[30px] h-[30px] rounded-full border border-gold flex items-center justify-center text-[11.5px] color-gold bg-[#151311] z-[2] font-semibold text-gold"
              >
                02
              </motion.div>
              <div className="mobile-hiw-line absolute left-[-27px] top-[30px] bottom-[-18px] w-[1px] bg-gold/15 z-[1]">
                <motion.div
                  variants={mobileLineVariants}
                  className="w-full h-full bg-gold origin-top"
                />
              </div>

              <motion.div
                variants={mobileCardVariants}
                className="mobile-hiw-card card p-[12px_14px] bg-[#24201d] overflow-hidden rounded-[12px]"
              >
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
              </motion.div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="mobile-hiw-step relative mb-[18px]"
              variants={mobileStepVariants}
            >
              <motion.div
                variants={mobileNumVariants}
                className="mobile-hiw-num absolute left-[-42px] top-0 w-[30px] h-[30px] rounded-full border border-gold flex items-center justify-center text-[11.5px] color-gold bg-[#151311] z-[2] font-semibold text-gold"
              >
                03
              </motion.div>
              <div className="mobile-hiw-line absolute left-[-27px] top-[30px] bottom-[-18px] w-[1px] bg-gold/15 z-[1]">
                <motion.div
                  variants={mobileLineVariants}
                  className="w-full h-full bg-gold origin-top"
                />
              </div>

              <motion.div
                variants={mobileCardVariants}
                className="mobile-hiw-card card p-[12px_14px] bg-[#24201d] overflow-hidden rounded-[12px]"
              >
                <div className="mhiw-row flex gap-[14px] items-start">
                  <div className="mhiw-text flex-[0.82] min-w-0">
                    <h4 className="mobile-hiw-title text-[14.5px] font-semibold mb-[2px]">Craft Your Formula</h4>
                    <p className="mobile-hiw-sub text-[10.5px] leading-[1.35] text-text-secondary mb-0">
                      Your fragrance is crafted around your unique profile.
                    </p>
                  </div>
                  <div className="mhiw-visual flex-[1.18] min-w-0">
                    {/* Scent Pyramid card mockup */}
                    <div className="mhiw-profile-card border border-border rounded-[12px] p-[10px] bg-white/[0.02]">
                      <div className="mhiw-profile-head flex justify-between items-center mb-[8px] gap-[6px]">
                        <p className="mhiw-profile-title text-[10.5px] text-gold font-semibold">Your Formula</p>
                        <div className="mhiw-profile-avatar w-[24px] h-[24px] rounded-full border border-border flex items-center justify-center text-text-primary">
                          <FlaskConical className="w-[12px] h-[12px]" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-[6px] py-[2px] items-center">
                        {/* Top Notes */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-[54px] h-[20px] overflow-hidden mb-[2px]">
                            <div className="absolute top-0 left-0 w-full h-[47px]">
                              <Image
                                src="/assets/scent-pyramid-tight.png"
                                alt="Top Notes Scent Pyramid"
                                fill
                                sizes="54px"
                                className="object-contain object-top"
                                priority
                              />
                            </div>
                          </div>
                          <p className="text-[9px] leading-tight m-0 text-center">
                            <span className="font-semibold text-text-primary">Top:</span> <span className="text-text-secondary">Bergamot, Lemon</span>
                          </p>
                        </div>

                        {/* Heart Notes */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-[54px] h-[14px] overflow-hidden mb-[2px]">
                            <div className="absolute top-[-20px] left-0 w-full h-[47px]">
                              <Image
                                src="/assets/scent-pyramid-tight.png"
                                alt="Heart Notes Scent Pyramid"
                                fill
                                sizes="54px"
                                className="object-contain object-top"
                                priority
                              />
                            </div>
                          </div>
                          <p className="text-[9px] leading-tight m-0 text-center">
                            <span className="font-semibold text-text-primary">Heart:</span> <span className="text-text-secondary">Lavender, Ginger</span>
                          </p>
                        </div>

                        {/* Base Notes */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-[54px] h-[16px] overflow-hidden mb-[2px]">
                            <div className="absolute top-[-33px] left-0 w-full h-[47px]">
                              <Image
                                src="/assets/scent-pyramid-tight.png"
                                alt="Base Notes Scent Pyramid"
                                fill
                                sizes="54px"
                                className="object-contain object-top"
                                priority
                              />
                            </div>
                          </div>
                          <p className="text-[9px] leading-tight m-0 text-center">
                            <span className="font-semibold text-text-primary">Base:</span> <span className="text-text-secondary">Cedarwood, Vetiver</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="mobile-hiw-step relative"
              variants={mobileStepVariants}
            >
              <motion.div
                variants={mobileNumVariants}
                className="mobile-hiw-num absolute left-[-42px] top-0 w-[30px] h-[30px] rounded-full border border-gold flex items-center justify-center text-[11.5px] color-gold bg-[#151311] z-[2] font-semibold text-gold"
              >
                04
              </motion.div>

              <motion.div
                variants={mobileCardVariants}
                className="mobile-hiw-card card p-[12px_14px] bg-[#24201d] overflow-hidden rounded-[12px]"
              >
                <div className="mhiw-row flex gap-[14px] items-start">
                  <div className="mhiw-text flex-[0.82] min-w-0">
                    <h4 className="mobile-hiw-title text-[14.5px] font-semibold mb-[2px]">Delivered to You</h4>
                    <p className="mobile-hiw-sub text-[10.5px] leading-[1.35] text-text-secondary mb-0">
                      Manufactured, quality checked and delivered to your doorstep in 4 days.
                    </p>
                  </div>
                  <div className="mhiw-visual flex-[1.18] min-w-0">
                    <div className="mhiw-profile-card border border-border rounded-[12px] p-[10px] bg-white/[0.02]">
                      <div className="mhiw-profile-head flex justify-between items-center mb-[8px] gap-[6px]">
                        <p className="mhiw-profile-title text-[10.5px] text-gold font-semibold">Delivery</p>
                        <div className="mhiw-profile-avatar w-[24px] h-[24px] rounded-full border border-border flex items-center justify-center text-text-primary">
                          <Truck className="w-[12px] h-[12px]" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-[5px] py-[2px]">
                        <div className="flex items-center justify-between text-[9px] text-text-secondary">
                          <span>Status:</span>
                          <span className="text-gold font-semibold">On the Way</span>
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-text-secondary">
                          <span>Estimated:</span>
                          <span className="text-text-primary font-medium">4 Days</span>
                        </div>
                        <div className="w-full h-[4px] bg-border rounded-[2px] overflow-hidden mt-[4px]">
                          <div className="h-full bg-gold" style={{ width: "75%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

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
