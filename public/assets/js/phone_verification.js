$('form').on('submit', function(event) {
    event.preventDefault();

    // if (!!getCodeFromUserInput()) {

    // }

    // window.verifyingCode = true;
    // updateVerifyCodeButtonUI();


    // var code = getCodeFromUserInput();
    var code = $("#verification_code").val();
    // alert(code);

    confirmationResult.confirm(code).then(function(result) {
        // User signed in successfully.
        alert("succ");
        var user = result.user;
        window.verifyingCode = false;
        window.confirmationResult = null;
        updateVerificationCodeFormUI();
    }).catch(function(error) {
        alert("failed");

        // User couldn't sign in (bad verification code?)
        console.error('Error while checking the verification code', error);
        window.alert('Error while checking the verification code:\n\n' +
            error.code + '\n\n' + error.message);
        window.verifyingCode = false;
        updateSignInButtonUI();
        updateVerifyCodeButtonUI();
    });

});

function updateVerificationCodeFormUI() {
    if (!firebase.auth().currentUser && window.confirmationResult) {
        document.getElementById('verification-code-form').style.display = 'block';
    } else {
        document.getElementById('verification-code-form').style.display = 'none';
    }
}