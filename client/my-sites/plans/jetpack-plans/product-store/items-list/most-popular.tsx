import config from '@automattic/calypso-config';
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import { useStoreItemInfoContext } from '../context/store-item-info-context';
import { FeaturedItemCard } from '../featured-item-card';
import { FeaturesList } from '../features-list';
import { HeroImage } from '../hero-image';
import { ItemPrice } from '../item-price';
import { MoreInfoLink } from '../more-info-link';
import { MostPopularProps } from '../types';
import { AmountSaved } from './amount-saved';

import './style-most-popular.scss';

export const MostPopular: React.FC< MostPopularProps > = ( {
	className,
	heading,
	items,
	onClickMoreInfoFactory,
	siteId,
} ) => {
	const wrapperClassName = classNames( 'jetpack-product-store__most-popular', className );

	const {
		getCheckoutURL,
		getCtaLabel,
		getIsDeprecated,
		getIsExternal,
		getIsIncludedInPlan,
		getIsIncludedInPlanOrSuperseded,
		getIsMultisiteCompatible,
		getIsOwned,
		getIsPlanFeature,
		getIsSuperseded,
		getIsUserPurchaseOwner,
		getOnClickPurchase,
		isMultisite,
	} = useStoreItemInfoContext();
	const translate = useTranslate();

	const isEnglish = config< Array< string | undefined > >( 'english_locales' ).includes(
		translate.localeSlug
	);

	return (
		<div className={ wrapperClassName }>
			<h2 className="jetpack-product-store__most-popular--heading">{ heading }</h2>
			<ul className="jetpack-product-store__most-popular--items">
				{ items.map( ( item ) => {
					const isOwned = getIsOwned( item );
					const isSuperseded = getIsSuperseded( item );
					const isDeprecated = getIsDeprecated( item );
					const isExternal = getIsExternal( item );
					const isIncludedInPlanOrSuperseded = getIsIncludedInPlanOrSuperseded( item );
					const isIncludedInPlan = getIsIncludedInPlan( item );
					const isMultiSiteIncompatible = isMultisite && ! getIsMultisiteCompatible( item );

					const isCtaDisabled =
						isMultiSiteIncompatible ||
						( ( isOwned || isIncludedInPlan ) && ! getIsUserPurchaseOwner( item ) );

					const ctaLabel = getCtaLabel( item );

					const hideMoreInfoLink = isDeprecated || isOwned || isIncludedInPlanOrSuperseded;

					const price = (
						<ItemPrice
							isMultiSiteIncompatible={ isMultiSiteIncompatible }
							isIncludedInPlan={ isIncludedInPlan }
							isOwned={ isOwned }
							item={ item }
							siteId={ siteId }
						/>
					);

					const description = (
						<p>
							<span>{ item.featuredDescription }</span>
							<br />

							{ ! hideMoreInfoLink && (
								<MoreInfoLink
									item={ item }
									isExternal={ isExternal }
									onClick={ onClickMoreInfoFactory( item ) }
								/>
							) }
						</p>
					);

					const ctaAsPrimary = ! ( isOwned || getIsPlanFeature( item ) || isSuperseded );

					// TODO remove this isEnglish check once we have translations for the new strings
					const amountSaved =
						isEnglish && item.productsIncluded?.length ? (
							<AmountSaved siteId={ siteId } product={ item } />
						) : null;

					return (
						<li key={ item.productSlug } className="jetpack-product-store__most-popular--item">
							<FeaturedItemCard
								amountSaved={ amountSaved }
								ctaAsPrimary={ ctaAsPrimary }
								ctaHref={ getCheckoutURL( item ) }
								ctaLabel={ ctaLabel }
								description={ description }
								hero={ <HeroImage item={ item } /> }
								isCtaDisabled={ isCtaDisabled }
								isCtaExternal={ isExternal }
								onClickCta={ getOnClickPurchase( item ) }
								price={ price }
								title={ item.displayName }
							/>
							<FeaturesList item={ item } />
						</li>
					);
				} ) }
			</ul>
		</div>
	);
};
