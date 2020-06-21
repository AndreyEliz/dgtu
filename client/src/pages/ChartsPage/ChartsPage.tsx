import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PieChart from 'components/charts/pie/PieChart';
import CardCustom from 'components/CardCustom/CardCustom';

const useStyles = makeStyles((theme) => ({
    pieChart: {
        width: 400,
        height: 400,
    }
}));

const pieData = [
    {
      "id": "make",
      "label": "make",
      "value": 295,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 109,
      "color": "hsl(216, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 280,
      "color": "hsl(148, 70%, 50%)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 433,
      "color": "hsl(46, 70%, 50%)"
    },
    {
      "id": "c",
      "label": "c",
      "value": 506,
      "color": "hsl(212, 70%, 50%)"
    }
  ]


const ChartsPage: React.FC = () => {
    const classes = useStyles();
 
    return (
    <Box>
        <CardCustom title="Статистика чего-нибудь">
            <div className={classes.pieChart}>
                <PieChart data={pieData}/>
            </div>
        </CardCustom>
    </Box>
    );
}

export default ChartsPage;