const GOOGLE_API_KEY = 'AIzaSyCF61nWSvp6vpC7RKC4b-xU8Yd9aMDZ9gI';

const SIGNATURE = 'k5lfwr38joxBxjnRV1CRFoSsJUg=';

export default function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}
