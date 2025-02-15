<html>
    <head>
        <title>3D</title>
        <meta http-equiv="Content-Language" content="tr">
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-9">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="now">
    </head>
    <body>
    <?php
        $orgClientId = "13IN001632";
        $orgOid = "ORDER25671278";
        $orgAmount = "91.96";
        $orgOkUrl = "https://posebanpoklon.rs/payment/success";
        $orgFailUrl = "https://posebanpoklon.rs/payment/fail";
        $orgTransactionType = "Auth";
        $orgInstallment = "";
        $orgRnd = bin2hex(random_bytes(20));
        $orgCurrency = "941";
        $clientId = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgClientId));
        $oid = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgOid));
        $amount = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgAmount));
        $okUrl = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgOkUrl));
        $failUrl = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgFailUrl));
        $transactionType = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgTransactionType));
        $installment = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgInstallment));
        $rnd = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgRnd));
        $currency = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgCurrency));
        $storeKey =  str_replace("|", "\\|", str_replace("\\", "\\\\", "Snv97961\\|"));
        $plainText = $clientId . "|" . $oid . "|" . $amount . "|" . $okUrl . "|" . $failUrl . "|" . $transactionType . "|" . $installment . "|" . $rnd . "||||" . $currency . "|" . "Snv97961";
        $hashValue = hash('sha512', $plainText);
        $hash = base64_encode(pack('H*', $hashValue));
        $description = "";
        $xid = "";
        $lang = "sr";
        $email = "";
        $userid = "";

    ?>
    <center>
        <form method="post" action="https://testsecurepay.eway2pay.com/fim/est3Dgate">
            <table>
                <tr>
                    <td align="center" colspan="2">
                        <input type="submit" value="Complete Payment"/>
                    </td>
                </tr>
            </table>
            <input type="hidden" name="clientid" value="<?php echo $orgClientId ?>">
            <input type="hidden" name="amount" value="<?php echo $orgAmount ?>">
            <input type="hidden" name="oid" value="<?php echo $orgOid ?>">
            <input type="hidden" name="okUrl" value="<?php echo $orgOkUrl ?>">
            <input type="hidden" name="failUrl" value="<?php echo $orgFailUrl ?>">
            <input type="hidden" name="trantype" value="<?php echo $orgTransactionType ?>">
            <input type="hidden" name="currency" value="<?php echo $orgCurrency ?>">
            <input type="hidden" name="rnd" value="<?php echo $orgRnd ?>">
            <input type="hidden" name="hash" value="<?php echo $hash ?>">
            <input type="hidden" name="storetype" value="3d_pay_hosting">
            <input type="hidden" name="hashAlgorithm" value="ver2">
            <input type="hidden" name="lang" value="<?php echo $lang ?>">
            <input type="hidden" name="encoding" value="utf-8" />
            <p><?php echo $hashValue?></p>
            <p><?php echo $hash?></p>
            <p><?php echo $plainText?></p>
        </form>
    </center>
    </body>
</html>