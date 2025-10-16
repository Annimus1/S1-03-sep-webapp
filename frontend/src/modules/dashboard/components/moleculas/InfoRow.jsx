import { Label } from "../atomos/Label";
import { Value } from "../atomos/Value";

export const InfoRow = ({ leftLabel, leftValue, rightLabel, rightValue }) => (
  <div className="row">
    <div className="col-12 col-md-6">
      <Label>{leftLabel}</Label>
      <Value>{leftValue}</Value>
    </div>
    <div className="col-12 col-md-6">
      <Label>{rightLabel}</Label>
      <Value>{rightValue}</Value>
    </div>  
  </div>
);
