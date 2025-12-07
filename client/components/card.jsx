import React from 'react';
import styled from 'styled-components';

const Card = ({ title, description }) => {
  return (
    <StyledWrapper>
      <div className="card"> 
        <h2 className='heading z-10 text-3xl font-bold text-center'>{title}</h2> 
        <p className='description z-10 font-normal text-sm'>{description}</p>
        <div className="bg" />
        <div className="blob" />
         
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  --card-w-min: 180px;
  --card-w-max: 260px;
  --card-h-min: 220px;
  --card-h-max: 320px;
  --glass: rgba(255, 255, 255, 0.7);
  --muted: #4b5563;
  --accent-a: #A78BFA;
  --accent-b: #7C3AED;

  display: inline-block;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  .card {
    position: relative;
    width: clamp(var(--card-w-min), 26vw, var(--card-w-max));
    height: clamp(var(--card-h-min), 34vh, var(--card-h-max));
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 22px;
    gap: 8px;

    /* soft neumorphism + subtle gradient for depth */
    background: linear-gradient(180deg, rgba(255,255,255,0.65), rgba(245,246,250,0.5));
    box-shadow:
      18px 18px 4px rgba(16, 24, 40, 0.06),
      8px 8px 10px rgba(255, 255, 255, 0.8),
      inset 0 1px 0 rgba(255,255,255,0.35);
    border: 1px solid rgba(255,255,255,0.5);
    transition: transform 360ms cubic-bezier(.2,.9,.2,1), box-shadow 360ms, filter 360ms;
    -webkit-tap-highlight-color: transparent;
    cursor: default;
  }

  /* content sits above glass & blobs */
  .heading,
  .description {
    position: relative;
    z-index: 20;
    text-align: center;
    margin: 0;
    padding: 0 8px;
    width: 100%;
    text-wrap: balance;
    color: #0f172a;
    text-shadow: 0 1px 0 rgba(255,255,255,0.6);
    pointer-events: none;
  }

  .heading {
    font-weight: 700;
    font-size: clamp(1rem, 2.4vw, 1.1rem);
    line-height: 1.15;
  }

  .description {
    font-weight: 400;
    font-size: clamp(.78rem, 1.6vw, .92rem);
    color: var(--muted);
    margin-top: 6px;
  }

  /* frosted glass panel slightly inset for clearer reading */
  .bg {
    position: absolute;
    inset: 6px;
    margin: 0;
    border-radius: 12px;
    z-index: 10;
    background: linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.6));
    backdrop-filter: blur(14px) saturate(120%);
    -webkit-backdrop-filter: blur(14px) saturate(120%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 20px rgba(16,24,40,0.06);
    border: 1px solid rgba(255,255,255,0.5);
    pointer-events: none;
  }

  /* animated colorful blob with layered pseudo-elements for richer look */
  .blob {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 180px;
    height: 180px;
    transform: translate(-50%, -50%) scale(1);
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, var(--accent-a) 0%, var(--accent-b) 55%, rgba(124,58,237,0.25) 100%);
    opacity: 0.95;
    filter: blur(28px) saturate(120%);
    z-index: 5;
    mix-blend-mode: screen;
    transition: transform 600ms ease, filter 600ms ease, opacity 400ms;
    animation: blob-drift 7s infinite ease-in-out;
    pointer-events: none;
  }

  .blob::before,
  .blob::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    filter: blur(36px) saturate(120%);
    opacity: 0.8;
    mix-blend-mode: screen;
  }

  .blob::before {
    width: 120px;
    height: 120px;
    left: -20%;
    top: -10%;
    background: linear-gradient(135deg, rgba(167,139,250,0.9), rgba(124,58,237,0.6));
  }

  .blob::after {
    width: 100px;
    height: 100px;
    right: -10%;
    bottom: -15%;
    background: linear-gradient(45deg, rgba(99,102,241,0.7), rgba(190,24,93,0.12));
  }

  @keyframes blob-drift {
    0%   { transform: translate(-60%, -60%) scale(1) rotate(0deg); }
    25%  { transform: translate(-30%, -70%) scale(1.05) rotate(8deg); }
    50%  { transform: translate(-10%, -40%) scale(1.08) rotate(18deg); }
    75%  { transform: translate(-40%, -20%) scale(1.03) rotate(-6deg); }
    100% { transform: translate(-60%, -60%) scale(1) rotate(0deg); }
  }

  /* interaction states */
  .card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow:
      26px 26px 60px rgba(16, 24, 40, 0.09),
      -18px -18px 40px rgba(255,255,255,0.85);
  }

  .card:hover .blob {
    animation-duration: 6s;
    filter: blur(26px) saturate(130%);
    transform: translate(-50%, -50%) scale(1.06);
    opacity: 1;
  }

  .card:focus-within,
  .card:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(99,102,241,0.12), 0 12px 30px rgba(16,24,40,0.06);
  }

  /* small screens adjustments */
  @media (max-width: 420px) {
    .card {
      padding: 16px;
      border-radius: 12px;
    }

    .blob { width: 140px; height: 140px; filter: blur(22px); }
  }

  @media screen and (max-width: 726px) {
    .card {
      width: 100%;
      height: 240px;
    }
      
  }
`;


export default Card;
