export function getTerminalName(id, origins){
  const origin = origins.find(element => element.id === id);
  return origin ? `${origin.name }, ${origin.state}` : 'No existe';
}

export function validateData(data){
  return (data.id !== '' 
    && data.origin_id !== ''
    && data.destination_id !== ''
    && data.arrival_time !== ''
    && data.company_name !== '')
}