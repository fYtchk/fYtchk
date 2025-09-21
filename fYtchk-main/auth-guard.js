// Auth guard for pages that require login
// Requires: firebase-app-compat.js, firebase-auth-compat.js, firebase-database-compat.js, and firebase-config.js loaded before this.
(function(){
  if (!window.FIREBASE_CONFIG) {
    console.error("FIREBASE_CONFIG missing. Include firebase-config.js before auth-guard.js");
    return;
  }
  try {
    if (!window.firebase || !firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(window.FIREBASE_CONFIG);
    }
  } catch (e) {
    console.error("Firebase init error in auth-guard:", e);
  }

  var redirectTarget = (function(){
    var params = new URLSearchParams(window.location.search);
    return params.get('redirect') || null;
  })();

  firebase.auth().onAuthStateChanged(function(user){
    if (!user) {
      var loginUrl = 'auth.html';
      var current = window.location.pathname.split('/').pop();
      if (current !== 'auth.html') {
        var qp = new URLSearchParams({ redirect: window.location.pathname + window.location.search });
        window.location.href = loginUrl + '?' + qp.toString();
      }
    } else {
      // Optionally, ensure user profile exists
      var uid = user.uid;
      firebase.database().ref('users/' + uid).once('value').then(function(snap){
        if (!snap.exists()) {
          // Create a minimal profile so downstream pages can rely on it
          var profile = { email: user.email || null, createdAt: Date.now() };
          return firebase.database().ref('users/' + uid).set(profile);
        }
      }).catch(function(err){
        console.warn('Profile ensure failed:', err);
      });
      if (redirectTarget) {
        // If we arrived at auth with redirect and are now authenticated, go there.
        // BUT, if we are on auth.html, the script on that page will handle it.
        if (window.location.pathname.indexOf('auth.html') === -1) {
          try { window.location.replace(redirectTarget); } catch(_) {}
        }
      }
    }
  });

  // Expose a simple logout helper for pages to bind to
  window.fytAuth = window.fytAuth || {};
  window.fytAuth.logout = function(){
    return firebase.auth().signOut().then(function(){
      var loginUrl = 'auth.html';
      var qp = new URLSearchParams({ redirect: window.location.pathname + window.location.search });
      window.location.href = loginUrl + '?' + qp.toString();
    });
  }
})();
