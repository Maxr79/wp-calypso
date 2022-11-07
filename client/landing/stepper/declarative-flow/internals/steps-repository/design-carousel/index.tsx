import { StepContainer } from '@automattic/onboarding';
import { useI18n } from '@wordpress/react-i18n';
import AsyncLoad from 'calypso/components/async-load';
import FormattedHeader from 'calypso/components/formatted-header';
import { recordTracksEvent } from 'calypso/lib/analytics/tracks';
import type { Step } from '../../types';

const DesignCarousel: Step = function DesignCarousel( { navigation } ) {
	const { goNext, goBack, submit } = navigation;
	const { __ } = useI18n();

	function handleSubmit( design: any ) {
		submit?.( design );
	}

	return (
		<StepContainer
			stepName="designCarousel"
			goBack={ goBack }
			goNext={ goNext }
			shouldHideNavButtons
			isFullLayout={ true }
			stepContent={
				<AsyncLoad
					require="@automattic/design-carousel"
					placeholder={ null }
					onPick={ handleSubmit }
				/>
			}
			recordTracksEvent={ recordTracksEvent }
			formattedHeader={
				<FormattedHeader
					id="seller-step-header"
					headerText={ __( 'Choose a design to start' ) }
					align="center"
				/>
			}
		/>
	);
};

export default DesignCarousel;