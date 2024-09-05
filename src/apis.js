export const macroAPI = 'https://api.bcra.gob.ar/estadisticas/v2.0/PrincipalesVariables'
export const dolarAPI = 'https://dolarapi.com/v1/dolares'
export const variableAPI = (id, desde, hasta)=>{ return `https://api.bcra.gob.ar/estadisticas/v2.0/DatosVariable/${id}/${desde}/${hasta}`}