import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Анимация появления окна
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
`;

// Стилизация блока
const VacancySection = styled.section`
  padding: 30px 0;
`;

const VacancyList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: flex-end;
`;

const VacancyItem = styled.li`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60, 30, 90, 0.04);
  padding: 20px 28px;
  min-width: 380px;
  max-width: 420px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VacancyTitle = styled.span`
  font-size: 18px;
  color: #232323;
  font-weight: 500;
`;

const VacancyTag = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  max-height: 200px;
  height: 100%;
  max-width: 150px;
  width: 100%;
  border-radius: 8px;
  padding: 4px 12px;
  margin-left: 16px;
  background: ${({ type }) => (type === 'office' ? '#fbeaf2' : '#eaf2fb')};
  color: ${({ type }) => (type === 'office' ? '#a13c6d' : '#2a6fd1')};
  border: 1px solid ${({ type }) => (type === 'office' ? '#e6b6d0' : '#b6d0e6')};
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.2s;
  position: relative;
  &:hover,
  &:focus {
    box-shadow: 0 0 0 2px #e6b6d0;
  }
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 7px;
    background: ${({ type }) => (type === 'office' ? '#a13c6d' : '#2a6fd1')};
  }
`;

// Модальное окно
const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  inset: 0;
  background: rgba(30, 30, 60, 0.25);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
`;

const ModalWindow = styled.div`
  background: #fff;
  border-radius: 0 0 0 0;
  box-shadow: 0 8px 32px rgba(60, 30, 90, 0.18);
  padding: 48px 56px 48px 56px;
  min-width: 700px;
  max-width: 900px;
  width: 100%;
  margin-top: 40px;
  position: relative;
  animation: ${fadeIn} 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  @media (max-width: 900px) {
    min-width: 0;
    padding: 32px 12px;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 32px;
  right: 32px;
  background: transparent;
  border: none;
  font-size: 32px;
  color: #23223a;
  cursor: pointer;
  z-index: 2;
  &:hover {
    color: #a13c6d;
  }
`;

const ModalTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #2a314b;
  margin: 0 0 32px 0;
  line-height: 1.2;
`;

const ModalRow = styled.div`
  display: flex;
  gap: 48px;
  align-items: flex-start;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const ModalCol = styled.div`
  flex: 1;
  min-width: 0;
`;

const ModalSubtitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #23223a;
  margin-bottom: 18px;
  margin-top: 0;
`;

const ModalText = styled.p`
  font-size: 18px;
  color: #2a314b;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

const ModalList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ModalListItem = styled.li`
  display: flex;
  align-items: flex-start;
  font-size: 18px;
  color: #2a314b;
  margin-bottom: 18px;
  line-height: 1.5;
  &::before {
    content: '';
    display: inline-block;
    min-width: 18px;
    min-height: 18px;
    width: 18px;
    height: 18px;
    margin-right: 14px;
    margin-top: 3px;
    border-radius: 50%;
    background: #e4c7d7;
    box-shadow: 0 0 0 4px #fbeaf2;
  }
`;

// Данные вакансий (только один список справа)
const vacancies = [
  {
    title: 'Викладач для індивідуальних занять',
    type: 'office',
    tag: 'Робота в офісі',
    about: 'Детальна інформація про вакансію "Викладач для індивідуальних занять".',
    duties: [
      'Проведення індивідуальних занять з англійської мови.',
      'Підготовка навчальних матеріалів.',
      'Оцінювання прогресу студентів.',
    ],
  },
];

const Modal = ({ open, onClose, vacancy }) => {
  React.useEffect(() => {
    if (!open) return;
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <ModalOverlay className="modal" onClick={onClose}>
      <ModalWindow className="modal__window" onClick={(e) => e.stopPropagation()} tabIndex={-1}>
        <ModalClose className="modal__close" aria-label="Закрити" onClick={onClose}>
          &times;
        </ModalClose>
        <ModalTitle className="modal__title">{vacancy.title}</ModalTitle>
        <ModalRow>
          <ModalCol>
            <ModalSubtitle>Про вакансію</ModalSubtitle>
            <ModalText>{vacancy.about}</ModalText>
          </ModalCol>
          <ModalCol>
            <ModalSubtitle>Що чекає на робочому місці:</ModalSubtitle>
            <ModalList>
              {vacancy.duties &&
                vacancy.duties.map((duty, idx) => <ModalListItem key={idx}>{duty}</ModalListItem>)}
            </ModalList>
          </ModalCol>
        </ModalRow>
      </ModalWindow>
    </ModalOverlay>
  );
};

const Vacancies = () => {
  const [modalVacancy, setModalVacancy] = useState(null);

  return (
    <VacancySection className="vacancy">
      <VacancyList className="vacancy__list">
        {vacancies.map((vac, idx) => (
          <VacancyItem className="vacancy__item" key={idx}>
            <VacancyTitle className="vacancy__title">{vac.title}</VacancyTitle>
            <VacancyTag
              className={`vacancy__tag vacancy__tag--${vac.type}`}
              type={vac.type}
              onClick={() => setModalVacancy(vac)}
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Детальніше про ${vac.tag}`}
            >
              {vac.tag}
            </VacancyTag>
          </VacancyItem>
        ))}
      </VacancyList>
      <Modal
        open={!!modalVacancy}
        onClose={() => setModalVacancy(null)}
        vacancy={modalVacancy || {}}
      />
    </VacancySection>
  );
};

export default Vacancies;
