import React,{useEffect, useState} from 'react'
import axiox from 'axios'
import './Table.css'
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
export default function Table() {
    const [data,setData]=useState([])
    const [name,setName]=useState('')
    useEffect(()=>{
        axiox.get('http://localhost:3000/reports')
        .then(res => setData(res.data))
        .catch(error => console.log(error))
    },[])
    const handleSubmit=(event) => {
        if(numDays ==0)alert("Cant supply for 0 days. Re-eneter") 
        event.preventDefault()
        const id=data.length + 1
        const dll=leadCount/numDays
        const dl=dll.toFixed(3)
        // const drr={leadCount}/num
        const d=new Date()
        const date=d.toLocaleDateString()
        const time=d.toLocaleTimeString()
        axiox.post('http://localhost:3000/reports', {id:id,startDate:startDate,endDate:endDate,excludedDates:excludedDates,numDays:numDays,leadCount:leadCount,drl:dl,date:date,time:time})
        .then(res => {
            // window.location.reload()
            setStartDate(new Date()) 
        })
        .catch(error => console.log(error))

        const newReport = {
            id: id,
            startDate: startDate,
            endDate: endDate,
            excludedDates: excludedDates,
            numDays: numDays,
            leadCount: leadCount,
            drl: dl,
            date: date,
            time: time,
          };
      
          // Update the data state with the new report without reloading the page
          setData([newReport,...data]);
    }
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [excludedDates, setExcludedDates] = useState([]);
    const [numDays, setNumDays]=useState(0)
    const [leadCount,setLeadCount]=useState(0)
    // const [drr,setDrr] = useState(0)

    const calculateDateDifference = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
    
        if (!isNaN(startDateObj) && !isNaN(endDateObj)) {
          const differenceInMilliseconds = endDateObj - startDateObj;
          const daysDifference = differenceInMilliseconds / (1000 * 60 * 60 * 24);
          if(excludedDates.length)setNumDays(Math.abs(Math.round(daysDifference))-excludedDates.length+1)
          else setNumDays(Math.abs(Math.round(daysDifference))+1)
        } else {
          setNumDays(-1);
        }
      }
      
      const display=excludedDates.join(', ');

      useEffect(() => {
        calculateDateDifference();
        // setNumDays()
      }, [endDate,excludedDates,startDate])

      const clearForm=() => {
        // window.location.reload()
        alert("Form Cleared")
      }
    
  return (
    <div className='Table'>
        <div id='form'>
            <form action="" onSubmit={handleSubmit}>
                <p>Enter Start Date: </p>
                <input type="date" name="" id="startDate" placeholder='ENter' required onChange={(e) => setStartDate(e.target.value)}/>
                <p>Enter End Date: </p>
                <input type="date" name="" id="endDate" required min={startDate} onChange={(e) => {
                    setEndDate(e.target.value)
                    // calculateDateDifference()
                }}/>
                <p>Exclude Dates: </p>
                <input type="date" name="" id="excludedDate" min={startDate} max={endDate}  onChange={(e) => {
   
                    if (!excludedDates.includes(e.target.value)) {
                
                        setExcludedDates([...excludedDates, e.target.value]);
                        // calculateDateDifference()
                      }
                    
                }} excludeDates={excludedDates}/>
                
                <p>{display}</p>
                
                <p>Number of Days: {numDays}</p>
                <input type="number" name="" id="leadCount" placeholder='Enter Lead Count' required onChange={e=>setLeadCount(Number(e.target.value))} />
                <button className='button' id='Add'>Add</button>
                <button className='button' id='cancel' onClick={clearForm}>Cancel</button>
            </form>
        </div>
      <table>
        <thead>
            <tr>
                <th>Action</th>
                <th>ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Excluded Daytes</th>
                <th>Number of Days</th>
                <th>Lead Count</th>
                <th>Expected DRR</th>
                <th>Last Updated</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((report,index)=> (
                    
                    <tr key={index}>
                        <td>
                        
                        </td> 
                        <td>{report.id}</td>
                        <td>{report.startDate}</td>
                        <td>{report.endDate}</td>
                        <td>{report.excludedDates.map((el)=>(el))}</td>
                        <td>{report.numDays}</td>
                        <td>{report.leadCount}</td>
                        <td>{report.drl}</td>
                        <td>{report.date } {report.time}</td>
                        
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  )
}
