import React, { useEffect, useState} from "react";
import {
    fetchTotalRdv,
    fetchRdvParStatut,
    fetchRdvEvolution,
    fetchRdvParMedecin
} from "../../api";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart,Line,CartesianGrid,XAxis,YAxis,ResponsiveContainer, } from "recharts";

//const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const STATUS_COLORS = {
  "annule": "#FF0000",   
  "confirme": "#00C49F",    
  "en attente": "#FFBB28"
};

const renderCustomLabel = ({ percent, status_name }) => {
  return `${(percent * 100).toFixed(0)}%`;
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {
        payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color, margin: '5px 0' }}>
            <span style={{ marginRight: '5px', display: 'inline-block', width: '10px', height: '10px', backgroundColor: entry.color }}></span>
            {entry.payload.status_name}: {entry.payload.total}
          </li>
        ))
      }
    </ul>
  );
};

const Stats = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  // Valeurs par défaut = du 1er du mois à aujourd’hui
  const [startDate, setStartDate] = useState(firstDay.toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);
  const [total, setTotal] = useState(0);
  const [parStatut, setParStatut] = useState<any[]>([]);
  //RDV medecin
  const [dataM, setDataM] = useState<any[]>([]);
  //Evolution
  const [start, setStart] = useState(firstDay.toISOString().split("T")[0]);
  const [end, setEnd] = useState(today.toISOString().split("T")[0]);
  const [data, setData] = useState<any[]>([]);
  const [interval, setInterval] = useState("day");



  const loadStats = () => {
    fetchTotalRdv(startDate, endDate).then((data) => {
      console.log("Total RDV:", data);
      setTotal(data.total);
    });

    fetchRdvParStatut(startDate, endDate).then((data) => {
      console.log("RDV par statut:", data);
      setParStatut(data);
    });

    fetchRdvParMedecin(startDate, endDate).then((dataM) => {
      console.log("RDV par medecin:", dataM);
      setDataM(dataM);
    });
  };

  useEffect(() => {
    fetchRdvEvolution(start, end, interval).then((res) => {
      setData(
        res.map((row: any) => ({
          periode: row.periode.split("T")[0], // formater la date
          total: parseInt(row.total, 10),
        }))
      );
    });
  }, [start, end, interval])

  useEffect(() => {
    loadStats();
  }, [startDate, endDate]);

  return (
    <div className="p-6 space-y-6">

      <div className="flex gap-6 items-start">
        {/* Graphique à gauche */}
        <div className="bg-white shadow p-6 rounded-xl flex-1">
          <h2 className="text-xl font-bold mb-4">Répartition des rendez-vous par statut</h2>
          {/* Filtres dates */}
          <div className="flex gap-4 items-center mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              Début :
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded"
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              Fin :
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded"
              />
            </label>
          </div>
          <PieChart width={500} height={400}>
            <Pie
              data={parStatut}
              dataKey="total"
              nameKey="status_name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={renderCustomLabel}
            >
              {parStatut.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status_name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend content={renderLegend} />
          </PieChart>
        </div>

        {/* Colonne de droite pour le total et la table */}
        <div className="flex flex flex-col gap-6">
          {/* Total */}
          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-2">Total RDV</h2>
            <p className="text-4xl font-semibold text-gray-800">{total}</p>
          </div>

          {/* Tableau des RDV confirmés */}
          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-2">RDV confirmés par médecin</h2>
            {/* Tableau */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Médecin
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total RDV
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataM.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      Aucun RDV trouvé
                    </td>
                  </tr>
                ) : (
                  dataM.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.nom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                        {row.total}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </div>
    </div>

    <div className="bg-white shadow p-6 rounded-xl flex-1">
      <h2 className="text-xl font-bold mb-4">Évolution des rendez-vous</h2>

      {/* Filtres */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Début :
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Fin :
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border p-2 rounded"
        />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Interval :
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="day">Jour</option>
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
          </select>
        </label>
      </div>

      {/* Graphe */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="periode" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#3abeebff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>
    
  );

}

export {Stats};