import {
  applyScheme,
  getSavedScheme,
  getSystemScheme,
} from '@app/colorSchemeUtils';

applyScheme(getSavedScheme() || getSystemScheme());
