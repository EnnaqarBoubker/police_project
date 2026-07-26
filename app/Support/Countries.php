<?php

namespace App\Support;

/**
 * Server-side mirror of resources/js/Constants/countries.js (names only —
 * dial codes aren't needed here). Kept in sync manually since ISO country
 * codes/names essentially never change.
 */
class Countries
{
    private const NAMES = [
        'MA' => 'Morocco', 'DZ' => 'Algeria', 'TN' => 'Tunisia', 'EG' => 'Egypt', 'LY' => 'Libya',
        'MR' => 'Mauritania', 'SD' => 'Sudan', 'SA' => 'Saudi Arabia', 'AE' => 'United Arab Emirates',
        'QA' => 'Qatar', 'KW' => 'Kuwait', 'OM' => 'Oman', 'BH' => 'Bahrain', 'IQ' => 'Iraq', 'SY' => 'Syria',
        'LB' => 'Lebanon', 'JO' => 'Jordan', 'YE' => 'Yemen', 'PS' => 'Palestine', 'FR' => 'France',
        'ES' => 'Spain', 'IT' => 'Italy', 'PT' => 'Portugal', 'DE' => 'Germany', 'GB' => 'United Kingdom',
        'NL' => 'Netherlands', 'BE' => 'Belgium', 'CH' => 'Switzerland', 'AT' => 'Austria', 'SE' => 'Sweden',
        'NO' => 'Norway', 'DK' => 'Denmark', 'FI' => 'Finland', 'RU' => 'Russia', 'US' => 'United States',
        'CA' => 'Canada', 'AU' => 'Australia', 'AD' => 'Andorra', 'AO' => 'Angola', 'AI' => 'Anguilla',
        'AG' => 'Antigua & Barbuda', 'AR' => 'Argentina', 'AM' => 'Armenia', 'AW' => 'Aruba',
        'AZ' => 'Azerbaijan', 'BS' => 'Bahamas', 'BD' => 'Bangladesh', 'BB' => 'Barbados', 'BY' => 'Belarus',
        'BZ' => 'Belize', 'BJ' => 'Benin', 'BM' => 'Bermuda', 'BT' => 'Bhutan', 'BO' => 'Bolivia',
        'BA' => 'Bosnia Herzegovina', 'BW' => 'Botswana', 'BR' => 'Brazil', 'BN' => 'Brunei',
        'BG' => 'Bulgaria', 'BF' => 'Burkina Faso', 'BI' => 'Burundi', 'KH' => 'Cambodia', 'CM' => 'Cameroon',
        'CV' => 'Cape Verde Islands', 'KY' => 'Cayman Islands', 'CF' => 'Central African Republic',
        'CL' => 'Chile', 'CN' => 'China', 'CO' => 'Colombia', 'KM' => 'Comoros', 'CG' => 'Congo',
        'CK' => 'Cook Islands', 'CR' => 'Costa Rica', 'HR' => 'Croatia', 'CU' => 'Cuba', 'CY' => 'Cyprus',
        'CZ' => 'Czech Republic', 'DJ' => 'Djibouti', 'DM' => 'Dominica', 'DO' => 'Dominican Republic',
        'EC' => 'Ecuador', 'SV' => 'El Salvador', 'GQ' => 'Equatorial Guinea', 'ER' => 'Eritrea',
        'EE' => 'Estonia', 'ET' => 'Ethiopia', 'FK' => 'Falkland Islands', 'FO' => 'Faroe Islands',
        'FJ' => 'Fiji', 'GF' => 'French Guiana', 'PF' => 'French Polynesia', 'GA' => 'Gabon',
        'GM' => 'Gambia', 'GE' => 'Georgia', 'GH' => 'Ghana', 'GI' => 'Gibraltar', 'GR' => 'Greece',
        'GL' => 'Greenland', 'GD' => 'Grenada', 'GP' => 'Guadeloupe', 'GU' => 'Guam', 'GT' => 'Guatemala',
        'GN' => 'Guinea', 'GW' => 'Guinea-Bissau', 'GY' => 'Guyana', 'HT' => 'Haiti', 'HN' => 'Honduras',
        'HK' => 'Hong Kong', 'HU' => 'Hungary', 'IS' => 'Iceland', 'IN' => 'India', 'ID' => 'Indonesia',
        'IR' => 'Iran', 'IE' => 'Ireland', 'IL' => 'Israel', 'JM' => 'Jamaica', 'JP' => 'Japan',
        'KZ' => 'Kazakhstan', 'KE' => 'Kenya', 'KI' => 'Kiribati', 'KP' => 'Korea North', 'KR' => 'Korea South',
        'KG' => 'Kyrgyzstan', 'LA' => 'Laos', 'LV' => 'Latvia', 'LS' => 'Lesotho', 'LR' => 'Liberia',
        'LI' => 'Liechtenstein', 'LT' => 'Lithuania', 'LU' => 'Luxembourg', 'MO' => 'Macao',
        'MK' => 'Macedonia', 'MG' => 'Madagascar', 'MW' => 'Malawi', 'MY' => 'Malaysia', 'MV' => 'Maldives',
        'ML' => 'Mali', 'MT' => 'Malta', 'MH' => 'Marshall Islands', 'MQ' => 'Martinique', 'YT' => 'Mayotte',
        'MX' => 'Mexico', 'FM' => 'Micronesia', 'MD' => 'Moldova', 'MC' => 'Monaco', 'MN' => 'Mongolia',
        'MS' => 'Montserrat', 'MZ' => 'Mozambique', 'MM' => 'Myanmar', 'NA' => 'Namibia', 'NR' => 'Nauru',
        'NP' => 'Nepal', 'NC' => 'New Caledonia', 'NZ' => 'New Zealand', 'NI' => 'Nicaragua', 'NE' => 'Niger',
        'NG' => 'Nigeria', 'NU' => 'Niue', 'NF' => 'Norfolk Islands', 'PW' => 'Palau', 'PA' => 'Panama',
        'PG' => 'Papua New Guinea', 'PY' => 'Paraguay', 'PE' => 'Peru', 'PH' => 'Philippines',
        'PL' => 'Poland', 'PR' => 'Puerto Rico', 'RE' => 'Reunion', 'RO' => 'Romania', 'RW' => 'Rwanda',
        'SM' => 'San Marino', 'ST' => 'Sao Tome & Principe', 'SN' => 'Senegal', 'RS' => 'Serbia',
        'SC' => 'Seychelles', 'SL' => 'Sierra Leone', 'SG' => 'Singapore', 'SK' => 'Slovak Republic',
        'SI' => 'Slovenia', 'SB' => 'Solomon Islands', 'SO' => 'Somalia', 'ZA' => 'South Africa',
        'LK' => 'Sri Lanka', 'SH' => 'St. Helena', 'KN' => 'St. Kitts', 'LC' => 'St. Lucia',
        'SR' => 'Suriname', 'SZ' => 'Swaziland', 'TW' => 'Taiwan', 'TJ' => 'Tajikistan', 'TH' => 'Thailand',
        'TG' => 'Togo', 'TO' => 'Tonga', 'TT' => 'Trinidad & Tobago', 'TR' => 'Turkey', 'TM' => 'Turkmenistan',
        'TC' => 'Turks & Caicos Islands', 'TV' => 'Tuvalu', 'UG' => 'Uganda', 'UA' => 'Ukraine',
        'UY' => 'Uruguay', 'UZ' => 'Uzbekistan', 'VU' => 'Vanuatu', 'VA' => 'Vatican City',
        'VE' => 'Venezuela', 'VN' => 'Vietnam', 'VG' => 'Virgin Islands - British',
        'VI' => 'Virgin Islands - US', 'WF' => 'Wallis & Futuna', 'ZM' => 'Zambia', 'ZW' => 'Zimbabwe',
    ];

    public static function name(?string $code): ?string
    {
        return $code ? (self::NAMES[strtoupper($code)] ?? null) : null;
    }

    public static function flag(string $code): string
    {
        $flag = '';
        foreach (str_split(strtoupper($code)) as $char) {
            $flag .= mb_chr(127397 + ord($char), 'UTF-8');
        }

        return $flag;
    }

    /** @return string[] */
    public static function codes(): array
    {
        return array_keys(self::NAMES);
    }
}
