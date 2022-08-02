import cx from 'classnames';
import { StepContainer } from 'calypso/../packages/onboarding/src';
import { recordTracksEvent } from 'calypso/lib/analytics/tracks';
import IntroStep from './intro';
import type { Step } from '../../types';

import './styles.scss';

const Intro: Step = function Intro( { navigation, flow } ) {
	const { goNext, goBack } = navigation;

	const handleGetStarted = () => {
		// needs to be implemented
		goNext();
	};
	return (
		<StepContainer
			stepName={ 'intro' }
			className={ cx( { 'is-newsletters': flow === 'newsletters' } ) }
			goBack={ goBack }
			goNext={ goNext }
			isHorizontalLayout={ false }
			isWideLayout={ true }
			isLargeSkipLayout={ false }
			stepContent={ <IntroStep flowName={ flow } goNext={ handleGetStarted } /> }
			recordTracksEvent={ recordTracksEvent }
		/>
	);
};

export default Intro;