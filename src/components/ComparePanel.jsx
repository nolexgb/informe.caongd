import {
  formatValue,
  getDelta
} from "../utils/format";

function buildItems(current, previous) {
  if (!current || !previous) return [];

  return [
    {
      label: "Proyectos internacionales",
      current: current.international_work.projects,
      previous: previous.international_work.projects,
      type: "number"
    },
    {
      label: "Inversión internacional",
      current: current.international_work.investment_eur,
      previous: previous.international_work.investment_eur,
      type: "currency"
    },
    {
      label: "Proyectos en Andalucía",
      current: current.andalusia_work.projects,
      previous: previous.andalusia_work.projects,
      type: "number"
    },
    {
      label: "Inversión en Andalucía",
      current: current.andalusia_work.investment_eur,
      previous: previous.andalusia_work.investment_eur,
      type: "currency"
    },
    {
      label: "Base social",
      current: current.social_base.members,
      previous: previous.social_base.members,
      type: "number"
    }
  ];
}

export default function ComparePanel({
  current,
  previous,
  year
}) {
  const items = buildItems(current, previous);

  if (!previous) {
    return (
      <section className="panel panel-table">
        <div className="panel-head">
          <div>
            <div
