# Inveon Mini Course

Bu proje, .Net Entity Framework ve React kullanılarak geliştirilmiş bir kurs e-ticaret web uygulamasıdır.

## Başlarken

Bu proje, [Create React App](https://github.com/facebook/create-react-app) kullanılarak başlatılmıştır.

### Gereksinimler

- Node.js
- npm (Node Package Manager)

### Kurulum

Projeyi klonladıktan sonra gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```sh
npm install
```
### Proje Yapısı

## Proje Yapılandırması

Proje dosya ve klasör yapısı aşağıdaki gibidir:

- **App.js**: Uygulamanın ana bileşeni. Tüm bileşenler buradan yönetilir.
- **index.js**: Uygulamanın giriş noktası. React uygulaması bu dosyadan başlatılır.
- **components**: Uygulamanın tüm bileşenlerini içerir. Tekrar kullanılabilir küçük bileşenler burada bulunur.
- **context**: Context API ile oluşturulan veri sağlayıcılarını içerir. Uygulama genelinde veri paylaşımı için kullanılır.
- **pages**: Uygulamanın farklı sayfalarını içerir (örneğin, Giriş, Anasayfa, Profil sayfaları).
- **services**: API çağrıları ve `axios` yapılandırması için kullanılan servisleri içerir.
- **public**: Statik dosyalar (örneğin, resimler, favicon) ve HTML şablonunun bulunduğu klasör.
