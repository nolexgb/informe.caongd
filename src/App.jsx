// src/App.jsx

import { useEffect, useMemo, useState } from "react";

import "./styles/theme.css";

import Header from "./components/Header";
import FiltersBar from "./components/FiltersBar";
import NarrativeHero from "./components/NarrativeHero";
import KPICards from "./components/KPICards";
import MapPanel from "./components/MapPanel";
import RankingList from "./components/RankingList";
import DataTable from "./components/DataTable";
import ComparePanel from "./components/ComparePanel";
import StickySectionNav from "./components/StickySectionNav";
import MotionSection from "./components/MotionSection";

import {
  buildCards,
  buildNarrative,
  buildRows,
  buildTableColumns,
  buildTopRanking
} from "./utils/selectors";

const YEARS = ["2023", "2024"];

/* =====================================
   SECTION HEADINGS
===================================== */

function getSectionHeading(section) {
  switch (section) {
    case "overview":
      return {
        eyebrow: "Resumen ejecutivo",
        title: "Panorama general de la cooperación andaluza",
        text: "Una vista sintética de la actividad, el alcance territorial y las principales magnitudes del ejercicio."
      };

    case "andalucia":
      return {
        eyebrow: "Trabajo en Andalucía",
        title: "Territorio, sectores y concentración provincial",
        text: "Explora la implantación territorial en Andalucía y la distribución de la actividad por áreas y métricas."
      };

    case "international":
      return {
        eyebrow: "Trabajo en otros países",
        title: "Presencia internacional y escala geográfica",
        text: "Analiza la actividad internacional por países, regiones y categorías con una lectura territorial integrada."
      };

    case "social":
      return {
        eyebrow: "Base social",
        title: "Red asociativa, personas y estructura social",
        text: "Consulta la dimensión social del ecosistema CAONGD con una mirada estructural y comparativa."
      };

    case "compare":
      return {
        eyebrow: "Comparativa anual",
        title: "Evolución de indicadores entre ejercicios",
        text: "Compara las magnitudes principales del año actual frente a 2023 para detectar cambios y continuidad."
      };

    default:
      return {
        eyebrow: "Informe interactivo",
        title: "Exploración de datos",
        text: "Consulta el informe mediante filtros, mapas, rankings y tablas."
      };
  }
}

/* =====================================
   METRICS
===================================== */

function getAllowedMetrics(section) {
  switch (section) {
    case "overview":
      return ["investment_eur", "projects", "people", "ongd"];

    case "andalucia":
      return [
        "investment_eur",
        "projects
