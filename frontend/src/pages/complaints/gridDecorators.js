import { format, parseISO } from "date-fns";

export const getColumns = () => [
  {
    name: "title",
    title: "Title"
  },
  {
    name: "description",
    title: "Description"
  },
  {
    name: "company",
    title: "Empresa",
    getCellValue: row => (row.company ? row.company.name : undefined)
  },
  {
    name: "city",
    title: "Locale",
    getCellValue: row =>
      `${row.city.name}, ${row.state.name} - ${row.country.name}`
  },
  {
    name: "created_at",
    title: "Created at",
    getCellValue: row =>
      row.created_at ? format(row.created_at, "DD/MM/YYYY") : undefined
  },
  {
    name: "actions",
    title: " "
  }
];
