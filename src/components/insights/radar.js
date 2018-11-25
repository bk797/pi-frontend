import React from 'react';
import { ResponsiveRadar } from '@nivo/radar'
// import {Heading} from 'grommet';

const Radar = ({radarData,title}) => {
  const {data,keys,index} = radarData;
	return(
      <div style={{height:'500px',width:'100%'}}>
         {//<Heading level="3" textAlign="end">{title}</Heading>
       }
    		<ResponsiveRadar
              data={data}
              keys={keys}
              indexBy={index}
              margin={{
                "top":70,
                "right":0,
                "bottom":70,
                "left":0
              }}
              curve="catmullRomClosed"
              colors="accent"
              legends={[
                {
                    "anchor": "top-left",
                    "direction": "column",
                    "translateX": 50,
                    "translateY": -40,
                    "itemWidth": 80,
                    "itemHeight": 20,
                    "itemTextColor": "#999",
                    "symbolSize": 12,
                    "symbolShape": "circle",
                    "effects": [
                        {
                            "on": "hover",
                            "style": {
                                "itemTextColor": "#000"
                            }
                        }
                    ]
                }
              ]}
            />
          </div>
	);
}

export default Radar