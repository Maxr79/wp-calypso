import { Button, useScrollToTop } from '@automattic/components';
import { useCallback, useRef } from '@wordpress/element';
import { Icon, arrowUp } from '@wordpress/icons';
import { useI18n } from '@wordpress/react-i18n';
import classnames from 'classnames';
import type { FC } from 'react';
import './back-to-top-button.scss';

export const BackToTopButton: FC = () => {
	const elementRef = useRef< HTMLElement | null >( null );
	const { __ } = useI18n();

	const isBelowThreshold = useCallback( ( containerNode: HTMLElement ) => {
		const SCROLL_THRESHOLD = 400;

		return containerNode.scrollTop > SCROLL_THRESHOLD;
	}, [] );

	const { isButtonVisible, scrollToTop } = useScrollToTop( {
		scrollTargetRef: elementRef,
		isBelowThreshold,
		smoothScrolling: false,
	} );

	return (
		<Button
			ref={ ( element ) => {
				elementRef.current = element?.parentElement ?? null;
			} }
			className={ classnames( 'back-to-top-button__help-center', {
				'is-visible': isButtonVisible,
			} ) }
			onClick={ scrollToTop }
		>
			<Icon icon={ arrowUp } size={ 16 } />
			{ __( 'Back to top', __i18n_text_domain__ ) }
		</Button>
	);
};
