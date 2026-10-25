plugins {
    id("com.android.application")
}

android {
    namespace = "com.ftratlas.app"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.ftratlas.app"
        minSdk = 23
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }
}
