// Skills.jsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SkillsSection = styled.section`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  padding: 20px 0;
`;

const SkillsColumn = styled.div`
  flex: 1;
  min-width: 280px;
`;

const SkillsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 700;
  color: #000;
  text-shadow: 1px 1px 2px hsla(0, 0.00%, 0.00%, 0.15);
`;

const SkillsAccent = styled.span`
  color:hsl(258, 88.60%, 72.50%);
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillsItem = styled.li`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 12px 15px;
  border-radius: 12px;
  margin-bottom: 12px;
  font-size: 16px;
  color:hsl(0, 0.00%, 5.90%); 
  box-shadow: inset 2px 2px 4px hsla(0, 0.00%, 0.00%, 0.35);
  transition-property: opacity, transform;
  transition-timing-function: ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  opacity: 0;
  transform: translate3d(100px, 0, 0);
  visibility: hidden;

  &.dom-is-ready {
    transition-duration: 1.2s, 0.6s;
  }

  &.scroll-effect--visible {
    opacity: 1;
    transform: none;
    visibility: visible;
    transition-delay: var(--delay, 0s);
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: inset 2px 2px 4px hsla(0, 0.00%, 0.00%, 0.35);
    background: hsl(249, 100.00%, 98.60%);
    cursor-pointer;
  }
`;

const SkillsDot = styled.span`
  width: 8px;
  height: 8px;
  background:hsl(258, 88.60%, 72.50%);
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
`;

function useScrollEffect(delay = 0) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.classList.add("scroll-effect", "dom-is-ready");
      el.style.setProperty("--delay", `${delay}s`);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-effect--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return [ref];
}

const Skills = () => {
  const hardSkills = [
    "HTML (HTML5), EJS, JSX",
    "CSS (CSS3), SASS (SCSS), PostCSS, Bootstrap, Tailwind, Animations",
    "JavaScript (ES6+, OOP), TypeScript",
    "React",
    "Redux (Redux Toolkit, Redux Persist), MobX, Zustand",
    "Formik, React Hook Form, Yup, Axios, React Router",
  ];

  const softSkills = [
    "I know how to work in a team, I have experience in communication with designers, managers and other developers",
    "I am responsible about deadlines",
    "I am attentive to the details of the terms of reference",
    "I am demanding of the quality of my code, I follow the code-style",
    "I have time management skills",
  ];

  return (
    <SkillsSection>
      <SkillsColumn>
        <SkillsTitle>
          Hard <SkillsAccent>skills</SkillsAccent>
        </SkillsTitle>
        <SkillsList>
          {hardSkills.map((text, idx) => {
            const [ref] = useScrollEffect(idx * 0.1);
            return (
              <SkillsItem key={idx} ref={ref}>
                <SkillsDot />
                {text}
              </SkillsItem>
            );
          })}
        </SkillsList>
      </SkillsColumn>

      <SkillsColumn>
        <SkillsTitle>
          Soft <SkillsAccent>skills</SkillsAccent>
        </SkillsTitle>
        <SkillsList>
          {softSkills.map((text, idx) => {
            const [ref] = useScrollEffect(idx * 0.1);
            return (
              <SkillsItem key={idx} ref={ref}>
                <SkillsDot />
                {text}
              </SkillsItem>
            );
          })}
        </SkillsList>
      </SkillsColumn>
    </SkillsSection>
  );
};

export default Skills;
