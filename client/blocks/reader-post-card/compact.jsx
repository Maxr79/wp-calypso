import PropTypes from 'prop-types';
import ReaderExcerpt from 'calypso/blocks/reader-excerpt';
import AutoDirection from 'calypso/components/auto-direction';
import FeaturedAsset from './featured-asset';

const CompactPost = ( { post, postByline, children, isDiscover, onClick } ) => {
	/* eslint-disable wpcalypso/jsx-classname-namespace,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
	return (
		<div className="reader-post-card__post" onClick={ onClick }>
			<FeaturedAsset
				post={ post }
				canonicalMedia={ post.canonical_media }
				postUrl={ post.URL }
				allowVideoPlaying={ false }
			/>
			<div className="reader-post-card__post-details">
				{ postByline }
				<AutoDirection>
					<h2 className="reader-post-card__title">
						<a className="reader-post-card__title-link" href={ post.URL }>
							{ post.title }
						</a>
					</h2>
				</AutoDirection>
				<ReaderExcerpt post={ post } isDiscover={ isDiscover } />
				{ children }
			</div>
		</div>
	);
	/* eslint-disable wpcalypso/jsx-classname-namespace,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
};

CompactPost.propTypes = {
	post: PropTypes.object.isRequired,
	postByline: PropTypes.object,
	isDiscover: PropTypes.bool,
};

export default CompactPost;
