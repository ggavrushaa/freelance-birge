<?php

namespace App\Enums;

enum SkillEnum: string
{
    case PHP = 'php';
    case PYTHON = 'python';
    case JAVA = 'java';
    case C_SHARP = 'c_sharp';
    case C_PLUS_PLUS = 'c_plus_plus';
    case JAVASCRIPT = 'javascript';
    case HTML = 'html';
    case CSS = 'css';
    case SQL = 'sql';
    case NO_SQL = 'no_sql';
    case GIT = 'git';
    case DOCKER = 'docker';
    case KUBERNETES = 'kubernetes';
    case AWS = 'aws';
    case AZURE = 'azure';
    case GCP = 'gcp';
    case LINUX = 'linux';
    case WINDOWS = 'windows';
    case MACOS = 'macos';
    case IOS = 'ios';
    case ANDROID = 'android';
    case REACT_NATIVE = 'react_native';
    case FLUTTER = 'flutter';
    case DESIGN = 'design';
    case VIDEO = 'video';
    case AUDIO = 'audio';
    case SEO = 'seo';
    case COPYWRITING = 'copywriting';
    case TRANSLATION = 'translation';
    case MARKETING = 'marketing';
    case MANAGEMENT = 'management';
    case HR = 'hr';
    case FINANCE = 'finance';
    case LAW = 'law';
    case MEDICINE = 'medicine';
    case ENGINEERING = 'engineering';
    case ARCHITECTURE = 'architecture';
    case OTHER = 'other';

    public function label(): string
    {
        return match ($this) {
            self::PHP => 'PHP',
            self::PYTHON => 'Python',
            self::JAVA => 'Java',
            self::C_SHARP => 'C#',
            self::C_PLUS_PLUS => 'C++',
            self::JAVASCRIPT => 'JavaScript',
            self::HTML => 'HTML',
            self::CSS => 'CSS',
            self::SQL => 'SQL',
            self::NO_SQL => 'NoSQL',
            self::GIT => 'Git',
            self::DOCKER => 'Docker',
            self::KUBERNETES => 'Kubernetes',
            self::AWS => 'AWS',
            self::AZURE => 'Azure',
            self::GCP => 'GCP',
            self::LINUX => 'Linux',
            self::WINDOWS => 'Windows',
            self::MACOS => 'macOS',
            self::IOS => 'iOS',
            self::ANDROID => 'Android',
            self::REACT_NATIVE => 'React Native',
            self::FLUTTER => 'Flutter',
            self::DESIGN => 'Design',
            self::VIDEO => 'Video',
            self::AUDIO => 'Audio',
            self::SEO => 'SEO',
            self::COPYWRITING => 'Copywriting',
            self::TRANSLATION => 'Translation',
            self::MARKETING => 'Marketing',
            self::MANAGEMENT => 'Management',
            self::HR => 'HR',
            self::FINANCE => 'Finance',
            self::LAW => 'Law',
            self::MEDICINE => 'Medicine',
            self::ENGINEERING => 'Engineering',
            self::ARCHITECTURE => 'Architecture',
            self::OTHER => 'Other',
        };
    }
}
