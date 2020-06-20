import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardCustom from 'components/CardCustom/CardCustom';
import BarChart from 'components/charts/bar/BarChart';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    ok: {
        color: theme.palette.success.main,
    },
    warning: {
        color: theme.palette.error.main,
    },
    chart: {
        height: 300,
        width: 1200,
    },
    card: {
        margin: 0,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
}));

const barChartData = [
    {
      "year": "2014",
      "value": 281,
    },
    {
      "year": "2015",
      "value": 231,
    },
    {
      "year": "20112",
      "value": 251,
    },
    {
      "year": "2017",
      "value": 212,
    },
    {
      "year": "2018",
      "value": 271,
    },
    {
      "year": "2019",
      "value": 220,
    },
    {
      "year": "2020",
      "value": 151,
      last: true,
    }
]
const average = barChartData.reduce((prev, cur)=> cur.value + prev, 0) / barChartData.length;

const matcher = (item: any) => {
    return item.data.data.last && (item.data.value < average)
}

const CriteriesPage: React.FC = () => {
    const classes = useStyles();
 
    return (
    <Box>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CardCustom className={classes.card} title="1. Востребованность данной образовательной программы на глобальном рынке труда">
                    <CardContent className={classes.cardContent}>
                        <Box className={classes.chart}>
                            <BarChart 
                                data={barChartData} 
                                matcher={matcher}
                                keys={['value']}
                                by={'year'}
                            />
                        </Box>
                        <Box>
                            <Typography>
                                Востребованность программы опустилась ниже среднего уровня.
                            </Typography>
                        </Box>
                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="2. Уровень капитализации выпускника программы">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="2. Уровень капитализации выпускника программы">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="3. Релевантность транслируемого знания публикациям в первом квартиле журналов Scopus, WOS за 2-х летний период по заданной тематике">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="4. Степень освоения компетенций в ходе прохождения дисциплины (текущий контроль успеваемости)">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="5. Степень освоения компетенций по итогам прохождения дисциплины (промежуточная аттестация)">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="5. Степень освоения компетенций по итогам прохождения дисциплины (промежуточная аттестация)">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="12. Показатели научной иинновационной активности акторов образовательной программы (НПР и привлеченные специалисты, задействованные в реализации)">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="7. Использование инновационных образовательных технологий в процессе реализации ООП">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="8. Инновационные проекты, реализованные в одной итерации ООП">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="9. P2P-оценка внутренних и внешних экспертов">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="10. Оценка качества материала, доступности и качества подачи материала со стороны обучающихся">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
            <Grid item xs={12}>
                <CardCustom className={classes.card} defaultOpen={false} title="11. Дополнительные критерии (количественные показатели)">
                    <CardContent>

                    </CardContent>
                </CardCustom>
            </Grid>
        </Grid>
        
    </Box>
    );
}

export default CriteriesPage;