// NavigationService.js
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function replace(name) {
  if (navigationRef.isReady()) {
    navigationRef.replace(name);
  }
}
