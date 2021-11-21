import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PlayingCard from '../PlayingCard/PlayingCard.jsx';
import Button from '@mui/material/Button';
import ResultChart from '../ResultChart/ResultChart';
import sortValueSuit from '../../modules/sortValueSuit';

function LearnMode(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const deal = useSelector(store => store.deal);
    const golfScore = useSelector(store => store.golfScore);
    const golfRounds = useSelector(store => store.global.golfRounds);
    const [displayResults, setDisplayResults] = useState(false);
    const flip = deal.filter(card => card.flip)[0] || null;

    // Deal cards on page load
    useEffect(() => {
        dispatch({ type: 'NEW_HAND' });
        dispatch({ type: 'DEAL', payload: 5 });
    }, []);

    // Deal a new hand
    const newHand = () => {
        //push to score page if total rounds met
        if (golfScore.length >= golfRounds) {
            history.push('/golfResults');
            return;
        }
        dispatch({ type: 'NEW_HAND' });
        setDisplayResults(false);
        setShowChart(false);
        dispatch({ type: 'DEAL', payload: 6 });
    }


    // CONDITIONAL RENDERING ==========

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


    //SORTING==========================
    //sort hand
    sortValueSuit(deal);

    return (
        <>
            {flip &&
                <div className="flip-container">
                    <PlayingCard key={flip.id} card={flip} />
                </div>
            }

            <div className="hand-container abs-center-x">
                {/* Render cards only if the hand has been dealt */}
                {deal.length > 1 && deal?.map(card => {
                    if (card.flip) return;
                    return <PlayingCard
                        key={card.id}
                        card={card}
                        noSelect={false}
                        max4={false}
                    />
                })}
            </div>
        </>
    )
}

export default LearnMode;