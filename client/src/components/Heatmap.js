import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip} from 'react-tooltip';
import './css/Heatmap.css'
const today = new Date();

const Heatmap = () => {

    const randomValues = getRange(2000).map((index) => {
        return {
          date: shiftDate(today, -index),
          count: getRandomInt(0, 4)
        };
      });
return(
    <div>
      <div className='d-flex p-5 py-4 flex-column '>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='fontBlue fw-bold m-0'>CIPHER MAP</p>
                </div>
            
                <div className='p-1 pt-3 text-sm'>
        
        <CalendarHeatmap style={{'margin': 'auto', 'max-width': '50vw'}}
          startDate={shiftDate(today, -364)}
          endDate={today}
          values={randomValues}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-beammp-${value.count}`;
          }}
          tooltipDataAttrs={(value) => {
            return {
              "data-tip": `${value.date.toISOString().slice(0, 10)} has count: ${
                value.count
              }`
            };
          }}
          showWeekdayLabels={true}
          
        />
        <ReactTooltip />
      </div>

        <div className="border-bottom mx-5"></div>



      </div>
      </div>

)}
    
    function shiftDate(date, numDays) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + numDays);
      return newDate;
    }
    
    function getRange(count) {
      return Array.from({ length: count }, (_, i) => i);
    }
    
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

export default Heatmap