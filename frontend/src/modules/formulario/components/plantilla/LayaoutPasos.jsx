import { useState } from "react";
import { RegistrationStepper } from "../organismos/RegistrationStepper";

export function LayaoutPasos( { paso }) {

  return (
    <>
      <style>{`
        .registration-page {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stepper-container {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
          max-width: 950px;
          padding: 30px 40px;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          width: 100%;
          flex: 1;
        }

        .step-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #b0b8b5;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 10px;
          flex-shrink: 0;
          transition: background-color 0.3s;
          margin-bottom: 8px;
        }

        .step-circle.active,
        .step-circle.completed {
          background-color: #2d5f4f;
        }

        .step-label {
          font-size: 13px;
          color: #2d3e38;
          font-weight: 500;
          line-height: 1.2;
        }

        .step-label.active {
          font-weight: 600;
        }

        .step-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .mini-circle {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background-color: #b0b8b5;
          transition: background-color 0.3s;
        }

        .mini-circle.active {
          background-color: #2d5f4f;
        }
      `}</style>

      <div className="registration-page">
        <RegistrationStepper currentStep={paso} />
      </div>
    </>
  );
}
