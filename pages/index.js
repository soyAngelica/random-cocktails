import {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Cached from '@material-ui/icons/Cached';


const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 345,
    },
    wrap: {
        width: '100%',
    },
    media: {
      height: 0,
      paddingTop: '290px', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

 function Coctkails() {
     const [drinks,setDrinks] = useState();
     useEffect(() => {
        async function dataData() {
           const data =  await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            setDrinks(data);
        }
        dataData() 
    }, []);
    return drinks;
}

function Block() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const drinks = Coctkails();
    if (!drinks) return (<p>Barman working...🍾</p>)
    // console.log(drinks);
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
                <Card className={classes.root}>
                    <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                        <MoreVertIcon />
                        </IconButton>
                    }
                    title={drinks.drinks[0].strDrink}
                    />
                    <CardMedia
                    className={classes.media}
                    image={drinks.drinks[0].strDrinkThumb}
                    title={drinks.drinks[0].strDrink}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {drinks.drinks[0].strInstructions}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Ingredients:</Typography>
                            <Typography paragraph>
                                {drinks.drinks[0].strIngredient1}
                            </Typography>
                            <Typography paragraph>
                                {drinks.drinks[0].strIngredient2}
                            </Typography>
                            <Typography paragraph>
                                {drinks.drinks[0].strIngredient3} 
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        </Grid>
    )
}



export default function Index() {
    const classes = useStyles();
    return (
        <div className={classes.wrap} style={{background: 'black', minHeight: '100vh',
        height: 'auto',
        background: 'black',
        paddingTop: 40,
        paddingBottom: 40,}}>
            <Typography variant="h2" component="h2" align='center' color="secondary" gutterBottom>
                What should I drink today?
                <IconButton aria-label="cached"  style={{ color: '#FFF'}}>
                    <Cached />
                </IconButton>
            </Typography>
            <Block />
        </div>
    )
}


